import express, { Request, Response } from 'express';
import morgan from "morgan";

import { AppDataSource } from "./infrastructure/config/dataSource";
import { UserService } from './app/services/UserService';
import { UserRepository } from './infrastructure/repositories/UserRepository';
import { UserController } from './api/controllers/UserController';
import logger from "./infrastructure/logger/logger";
import { env } from './infrastructure/config/config';
import { RoleRepository } from './infrastructure/repositories/RoleRepository';
import { RoleService } from './app/services/RoleService';
import { RoleController } from './api/controllers/RoleController';


AppDataSource.initialize().then(() => {
    const app = express();

    app.use(
        morgan("combined", {
            stream: { write: (message: string) => logger.info(message.trim()) },
        })
    );

    const PORT = env.port;
    app.use(express.json());

    app.get('/', (req: Request, res: Response) => {
        res.send('Servidor Up');
    });

    const roleRepository = new RoleRepository();
    const roleService = new RoleService(roleRepository);
    const roleController = new RoleController(roleService);
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository, roleRepository);
    const userController = new UserController(userService);

    app.use('/users', userController.router);
    app.use('/roles', roleController.router);

    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
}).catch(error => console.log(error));