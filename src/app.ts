import dotenv from 'dotenv';
import Server from './models/server';
import { IUser } from './interfaces/user.interface';

//Configuration dot.env
dotenv.config();

const server = new Server;

// Extend Express Request
declare global{
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

server.listen();
