import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import generateJWT from '../helpers/generate-jwt';
import { googleVerify } from '../helpers/google-verify';

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        // Check user exists
        const user = await User.findOne({ email });
        
        if( !user || !user.state ) {
            return res.status(400).json({
                msg: 'We can\'t find that email and password.'
            });
        }
        // Check password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'We can\'t find that email and password.'
            });
        }

        // JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
         });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Server error'
        })
    }
}

export const googleSignIn = async (req: Request, res: Response) => {
    const { id_token} = req.body;
    try {
        const {name, email, img} = await googleVerify(id_token);
        
        let user = await User.findOne({email});
        
        if(!user){
            const data = {
                name,
                email,
                password: 'google',
                img,
                google: true

            }
            user = new User( data );
            await user.save();
            
        }

        if(!user.state){
            return res.status(401).json({
                msg:'User blocked'
            })
        }

        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'google token invalid'
        })
    }

}