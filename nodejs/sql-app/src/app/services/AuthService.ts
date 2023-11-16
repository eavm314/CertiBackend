import bcrypt from "bcrypt";

import { IUserEntity } from "../../domain/entities/IUserEntity";
import { User } from "../../domain/models/User";
import logger from "../../infrastructure/logger/logger";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { EncryptJwt } from "../../infrastructure/utils/EncryptJwt";
import { LoginDto } from "../dtos/LoginDto";
import { UserResponseDto } from "../dtos/UserResponseDto";

export class AuthService {

    constructor(private userRepository: UserRepository, private encrypt: EncryptJwt) {

    }

    async login(loginDTO: LoginDto): Promise<UserResponseDto> {
        const userEntity: Partial<IUserEntity> = {
            email: loginDTO.email,
            passwordHash: loginDTO.password
        };
        const user: User = await this.userRepository.findByEmail(userEntity.email);
        if (!user) {
            logger.error(`El usuario con el email: ${userEntity.email} no existe`);
            throw Error('El email o el password son incorrectos');
        }

        // TODO: llevarlo al utils 

        const isPasswordCorrect = await bcrypt.compare(userEntity.passwordHash, user.passwordHash);
        if (!isPasswordCorrect) {
            logger.error(`La contraseña es incorrecta : ${userEntity.email}`);
            throw Error('El email o el password son incorrectos');
        }

        const token = this.encrypt.encrypt({ userId: user.id });
        user.token = token;
        user.lastLogin = new Date();

        const userUpdated = await this.userRepository.updateUser(user.id, user);

        return {
            id: userUpdated.id,
            username: userUpdated.username,
            email: userUpdated.email,
            lastLogin: userUpdated.lastLogin,
            roleId: userUpdated.role.id,
            token: user.token
        };
    }
}