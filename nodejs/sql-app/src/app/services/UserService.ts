import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserDto } from '../dtos/UserDto';

export class UserService {
    constructor(private userRepository: IUserRepository) { }

    async getUserById(id: string): Promise<UserDto | null> {
        const user = await this.userRepository.findById(id);
        if (!user) return null;

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            lastLogin: user.lastLogin
        };
    }
}
