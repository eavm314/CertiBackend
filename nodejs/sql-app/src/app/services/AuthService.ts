import { IUserEntity } from "../../domain/entities/IUserEntity";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { LoginDto } from "../dtos/LoginDto";

export class AuthService {
    constructor(private userRepository: UserRepository) { }

    async login(loginDTO: LoginDto): Promise<string> {
        const userEntity: Partial<IUserEntity> = {
            email: loginDTO.email,
            passwordHash: loginDTO.password
        };
        const user = this.userRepository.findByEmail(userEntity.email);
        console.log(user);
        return 'user';
    }
}