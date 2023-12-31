import { IUserEntity } from "../../domain/entities/IUserEntity";
import { ICacheService } from "../../domain/interfaces/ICacheService";
import { IRoleRepository } from "../../domain/interfaces/IRoleRepository";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/models/User";
import logger from "../../infrastructure/logger/logger";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { UserResponseDto } from '../dtos/UserResponseDto';

export class UserService {
    constructor(
        private userRepository: IUserRepository, 
        private roleRepository: IRoleRepository,
        private cacheService: ICacheService
    ) { }

    // get all users
    async getUsers(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAll();
        logger.debug(`Users from repo: ${JSON.stringify(users)}`)
        const usersResponse: UserResponseDto[] = users.map((user: User) => {
            const userDto: UserResponseDto = {
                id: user.id,
                username: user.username,
                email: user.email,
                lastLogin: user.lastLogin,
                roleId: user.role?.id
            }
            return userDto;
        });

        return usersResponse;
    }

    async getUserById(id: string): Promise<UserResponseDto | null> {
        logger.info("service, getUserById");
        logger.debug(`service, getUserById(${id})`);
        
        const userCache = await this.cacheService.get(`USER:${id}`);

        if (userCache){
            const userResponse = JSON.parse(userCache) as UserResponseDto;
            logger.info(`UserCache recuperado: ${userResponse.email}`);
            return userResponse;
        }

        const user = await this.userRepository.findById(id);
        if (!user) return null;
        
        const userResponse: UserResponseDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin,
            roleId: user.role?.id
        };

        this.cacheService.set(`USER:${user.id}`, JSON.stringify(user));

        return userResponse;
    }

    async createUser(newUser: CreateUserDto): Promise<UserResponseDto | null> {
        logger.info("service, createUser");
        logger.debug(`service, createUser(${Object.entries(newUser)})`);

        const role = await this.roleRepository.findById(newUser.roleId);
        if (!role) {
            throw new Error('Rol no encontrado');
        }

        const userEntity: IUserEntity = {
            username: newUser.username,
            email: newUser.email,
            passwordHash: newUser.password,
            role: role,
            lastLogin: null,
            createdAt: new Date()
        }
        
        const user = await this.userRepository.createUser(new User(userEntity));

        const userResponse: UserResponseDto = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin,
            roleId: user.role.id
        };

        return userResponse;
    }

    async deleteUser(userId: string): Promise<void> {
        logger.debug(`UserService: Intentando eliminar al usuario con ID: ${userId}`);
        await this.userRepository.deleteUser(userId);
    }

    async updateUser(userId: string, updateData: Partial<CreateUserDto>): Promise<User> {
        logger.debug(`UserService: Intentando actualizar al usuario con ID: ${userId}`);
        return this.userRepository.updateUser(userId, updateData);
    }
}
