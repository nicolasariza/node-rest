import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {

    const { page = '1', limit } = req.query;

    res.json({
        msg:'GET - users',
        page,
        limit
    });
}

export const postUsers = (req: Request, res: Response) => {

    const { name } = req.body;

    res.json({
        msg:'POST - users',
        name
    });
}

export const putUsers = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg:'PUT - users',
        id
    });
}

export const deleteUsers = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg:'DELETE - users',
        id
    });
}