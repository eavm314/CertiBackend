import { Request, Response, Router } from 'express';
import { UserService } from '../../app/services/UserService';
import { UserResponseDto } from '../../app/dtos/UserResponseDto';
import { CreateUserDto } from '../../app/dtos/CreateUserDto';
import logger from '../../infrastructure/logger/logger';
import { userValidationRules } from '../middleware/userValidation';
import { validate } from 'uuid';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.routes();
    }

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserResponseDto'
 */
    public async getUsers(req: Request, res: Response): Promise<void> {
        const users: UserResponseDto[] = await this.userService.getUsers();
        res.json(users);
    }

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     description: Retrieve a user based on their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       404:
 *         description: User not found
 */
    public async getUserById(req: Request, res: Response): Promise<void> {
        logger.info("Obteniendo User por Id");
        
        const { id } = req.params;

        logger.debug(`controller, getUserById(${id})`);

        const userDto = await this.userService.getUserById(id);

        if (!userDto) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(userDto);
    }

    /**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     description: Create a new user based on the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 */
    public async createUser(req: Request, res: Response): Promise<Response> {
        logger.info("Creando usuario");
        logger.debug(`controller, createUser(${req.body})`);

        try {
            const userDto: CreateUserDto = req.body;
            const user = await this.userService.createUser(userDto);
            return res.status(201).json({ message: "User created successfully", user });

        } catch (error: any) {
            logger.error("Error al procesar la solicitud", {
                operation: 'createUser',
                errorMessage: error.message,
                errorStack: error.stack,
            });
            return res.status(400).json({ message: error });
        }
    }

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
 *     description: Update a user based on their ID with the provided data.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponseDto'
 *       404:
 *         description: User not found
 */
    public async updateUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const updateData = req.body;
        try {
            logger.debug(`Intentando actualizar al usuario con ID: ${id}`);
            const updatedUser = await this.userService.updateUser(id, updateData);
            logger.info(`Usuario con ID: ${id} actualizado con éxito`);
            return res.status(200).json({ user: updatedUser });
        } catch (error) {
            logger.error(`Error al actualizar al usuario con ID: ${id}. Error: ${error}`);
            return res.status(500).json({ message: 'Error al actualizar el usuario' });
        }
    };

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     description: Delete a user based on their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            logger.debug(`Intentando eliminar al usuario con ID: ${id}`);
            await this.userService.deleteUser(id);
            logger.info(`Usuario con ID: ${id} eliminado con éxito`);
            return res.status(200).json({ message: 'Usuario eliminado con éxito' });
        } catch (error) {
            logger.error(`Error al eliminar al usuario con ID: ${id}. Error: ${error}`);
            return res.status(500).json({ message: error });
        }
    }

    public routes() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', userValidationRules(), validate, this.createUser.bind(this));
        this.router.delete('/:id', this.deleteUser.bind(this));
        this.router.put('/:id', this.updateUser.bind(this));
    }
}