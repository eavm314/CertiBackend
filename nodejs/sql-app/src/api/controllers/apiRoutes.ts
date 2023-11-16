import { Router } from 'express';
import { RoleRepository } from '../../infrastructure/repositories/RoleRepository';
import { RoleService } from '../../app/services/RoleService';
import { RoleController } from './RoleController';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { UserService } from '../../app/services/UserService';
import { UserController } from './UserController';
import { AuthService } from '../../app/services/AuthService';
import { AuthController } from './AuthController';
import { EncryptJwt } from '../../infrastructure/utils/EncryptJwt';
import { RedisCacheService } from '../../infrastructure/cache/RedisCacheService';

const encrypt = new EncryptJwt();

const redisService = new RedisCacheService();

const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const userRepository = new UserRepository();
const userService = new UserService(userRepository, roleRepository, redisService);
const userController = new UserController(userService);
const authService = new AuthService(userRepository, encrypt, redisService);
const authController = new AuthController(authService);

export function apiRoutes(): Router {
    const router = Router();

    router.use('/users', userController.router);
    router.use('/roles', roleController.router);
    router.use('/auth', authController.router);

    return router;
}
