import { Request, Response, Router } from 'express';
import { LoginDto } from '../../app/dtos/LoginDto';
import { AuthService } from '../../app/services/AuthService';

export class AuthController {
    public router: Router;
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
        this.router = Router();
        this.routes();
    }

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión de un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginCredentials'
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 */
    public async login(req: Request, res: Response): Promise<Response> {
        try {
            const loginDTO: LoginDto = req.body;
            const loginResponse = await this.authService.login(loginDTO);
            return res.status(200).json(loginResponse);
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: error });
        }
    }

    public routes() {
        this.router.post('/login', this.login.bind(this));
    }
}