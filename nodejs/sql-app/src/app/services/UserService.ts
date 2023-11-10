import { IUserEntity } from "../../domain/entities/IUserEntity";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { User } from "../../domain/models/User";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { UserResponseDto } from '../dtos/UserResponseDto';

export class UserService {
    constructor(private userRepository: IUserRepository) { }

    async getUserById(id: string): Promise<UserResponseDto | null> {
        const user = await this.userRepository.findById(id);
        if (!user) return null;

        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin,
            roleId: user.roleId
        };

        return userResponse;
    }

    async createUser(newUser: CreateUserDto): Promise<UserResponseDto | null> {
        const userEntity: IUserEntity = {
            username: newUser.username,
            email: newUser.email,
            passwordHash: newUser.password,
            roleId: newUser.roleId,
            lastLogin: null,
            createdAt: new Date()
        }
        
        const user = await this.userRepository.createUser(new User(userEntity));

        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin,
            roleId: user.roleId
        };

        return userResponse;
    }
}
