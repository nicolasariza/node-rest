import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface ICategory extends Document {
    name: string;
    state: boolean;
    user: IUser;
}
