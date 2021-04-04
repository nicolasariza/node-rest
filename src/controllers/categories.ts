import { Request, Response } from 'express';
import Category from '../models/category';

export const postCategories = async (req: Request, res: Response) => {

    const name = req.body.name.toUpperCase();
    const categoryDB = await Category.findOne({ name });

    if( categoryDB ) {
        return res.status(400).json({
            msg: `category ${ name } exists` 
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save();

    res.status(201).json(category)
}
