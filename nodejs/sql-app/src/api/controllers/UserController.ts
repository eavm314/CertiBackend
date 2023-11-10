import { Request, Response, Router } from 'express';
import { UserService } from '../../app/services/UserService';
import { UserResponseDto } from '../../app/dtos/UserResponseDto';
import { CreateUserDto } from '../../app/dtos/CreateUserDto';

export class UserController {
    public router: Router;
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
        this.router = Router();
        this.routes();
    }

    public async getUserById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userDto = await this.userService.getUserById(id);

        if (!userDto) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.json(userDto);
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const userPayload: CreateUserDto = req.body;
            const user = await this.userService.createUser(userPayload);
            return res.status(201).json({ message: "User created successfully", user});

        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    }

    public routes() {
        this.router.get('/:id', this.getUserById.bind(this));
        this.router.post('/', this.createUser.bind(this));
    }
}