import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(from)).limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}

export const postUsers = async (req: Request, res: Response) => {

    const { name, email, password, role } = req.body;
    const user = new User({
        name, email, password, role
    });

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
    res.json({
        user
    });
}

export const putUsers = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password, google, ...rest } = req.body;

    if( password ) {
        const salt = bcryptjs.genSaltSync(10);
        rest.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.json({
        user
    });
}

export const deleteUsers = async (req: Request, res: Response) => {

    const { id } = req.params;

    // Delete user
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {state: false});

    res.json({
        user
    });
}