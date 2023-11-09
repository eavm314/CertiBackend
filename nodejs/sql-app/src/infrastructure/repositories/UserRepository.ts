import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserEntity } from "../entities/UserEntity";
import { AppDataSource } from "../config/dataSource";
import { User } from "../../domain/models/UserModel";

export class UserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        const userEntity = await AppDataSource.getRepository(UserEntity).findOneBy({ id });
        return userEntity ? new User(userEntity) : null;
    }
}