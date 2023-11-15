import { IRoleRepository } from "../../domain/interfaces/IRoleRepository";
import { Role } from "../../domain/models/Role";
import { AppDataSource } from "../config/dataSource";
import { RoleEntity } from "../entities/RoleEntity";

import logger from "../logger/logger";

export class RoleRepository implements IRoleRepository {
    async findById(id: string): Promise<Role> {
        const roleRepository = AppDataSource.getRepository(RoleEntity);
        const role = await roleRepository.findOne({
            where: { id },
        });
        return role ? new Role(role) : null;
    }

    async createRole(role: Role): Promise<Role> {
        const roleRepository = AppDataSource.getRepository(RoleEntity);
        const roleEntity = roleRepository.create({
            id: role.id,
            name: role.name,
            description: role.description
        });
        
        const roleResponse = await roleRepository.save(roleEntity);
        return new Role({
            id: roleResponse.id,
            name: roleResponse.name,
            description: roleResponse.description
        })
    }

    deleteRole(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateRole(roleId: string, updateData: Partial<Role>): Promise<Role> {
        throw new Error("Method not implemented.");
    }
}