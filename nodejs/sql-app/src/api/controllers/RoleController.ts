import { Request, Response, Router } from 'express';
import { RoleService } from '../../app/services/RoleService';
import { CreateRoleDTO as CreateRoleDto } from '../../app/dtos/CreateRoleDto';

export class RoleController {
    public router: Router;
    private roleService: RoleService;

    constructor(roleService: RoleService) {
        this.roleService = roleService;
        this.router = Router();
        this.routes();
    }

    public async createRole(req: Request, res: Response): Promise<Response> {
        try {
            const roleDto: CreateRoleDto = req.body;
            const role = await this.roleService.createRole(roleDto);
            return res.status(201).json(role);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    }

    public async getRoleById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const userDto = await this.roleService.getRoleById(id);

        if (!userDto) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }

        res.json(userDto);
    }


    public routes() {
        this.router.get('/:id', this.getRoleById.bind(this));
        this.router.post('/', this.createRole.bind(this));
        // this.router.delete('/:userId', this.deleteUser.bind(this));
        // this.router.put('/:userId', this.updateUser.bind(this));
    }
}