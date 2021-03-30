import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user';
import generateJWT from '../helpers/generate-jwt';

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