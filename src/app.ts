import dotenv from 'dotenv';
import Server from './models/server';

//Configuration dot.env
dotenv.config();

const server = new Server;

server.listen();
