import { User } from "../models/UserModel";

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
}