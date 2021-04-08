import { Request, Response } from 'express';
import Category from '../models/category';

export const getCategories = async (req: Request, res: Response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query).skip(Number(from)).limit(Number(limit)).populate('user', 'name')
    ]);

    res.json({
        total,
        categories
    });
};

export const getCategory = async (req: Request, res: Response) => {
    
    const query = { state: true };

    const categories = await Category.findById(req.params.id).where(query).populate('user', 'name')

    res.json({
        categories
    });
};

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
};

export const putCategories = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { state, user, ...rest } = req.body;

    rest.name = rest.name.toUpperCase();
    rest.user = req.user.id;

    const category = await Category.findByIdAndUpdate( id, rest, {new: true});

    res.json({
        category
    });
};

export const deleteCategories = async (req: Request, res: Response) => {
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});

    res.json({
        category
    });
}
