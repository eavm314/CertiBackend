import express, { Request, Response } from 'express';
import { AppDataSource } from "./infrastructure/config/dataSource";
import { UserService } from './app/services/UserService';
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { UserController } from './api/controllers/UserController';

AppDataSource.initialize().then(() => {
    const app = express();

    const PORT = 3000;
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Servidor Up');
    });

    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.use('/users', userController.router);

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));