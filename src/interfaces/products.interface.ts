import { Document } from "mongoose";
import { ICategory } from "./category.interface";
import { IUser } from './user.interface';

export interface IProduct extends Document {
    name: string;
    state: boolean;
    user: IUser;
    price: number;
    category: ICategory;
    description: string;
    available: boolean;
}
