import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Middlewares
        this.middlewares()

        this.routes();
    }

    middlewares(): void {
        // CORS
        this.app.use(cors());
        // Lectura del body
        this.app.use( express.json() );
        // Directorio público
        this.app.use( express.static('public'));
    }

    routes(): void {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen(): void {
        this.app.listen( this.port, () => {
            console.log('Server runing on port: ' + this.port);
        })
    }
}

export default Server;