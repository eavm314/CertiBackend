import { CreateUserDto } from "../../app/dtos/CreateUserDto";
import { UserResponseDto } from "../../app/dtos/UserResponseDto";
import { User } from "../models/User";

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    createUser(user: User): Promise<User>;
}