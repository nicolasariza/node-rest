import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { state: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(Number(from))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    res.json({
        total,
        products
    });
};

export const getProduct = async (req: Request, res: Response) => {
    
    const query = { state: true };

    const products = await Product.findById(req.params.id)
                                .where(query)
                                .populate('user', 'name')
                                .populate('category', 'name');

    res.json({
        products
    });
};

export const postProducts = async (req: Request, res: Response) => {
    
    const { state, user, ...body } = req.body;
    body.name = body.name.toUpperCase();
    const productDB = await Product.findOne({ name: body.name });

    if( productDB ) {
        return res.status(400).json({
            msg: `product ${ body.name } exists` 
        })
    }
    
    const data = {
        ...body,
        user: req.user.id
    };
    const product = new Product(data);

    await product.save();

    res.status(201).json(product)
};

export const putProducts = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { state, user, ...rest } = req.body;

    if(rest.name){
        rest.name = rest.name.toUpperCase();
    };
    rest.user = req.user.id;

    const product = await Product.findByIdAndUpdate( id, rest, {new: true});

    res.json({
        product
    });
};

export const deleteProducts = async (req: Request, res: Response) => {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, {state: false}, {new: true});

    res.json({
        product
    });
}
