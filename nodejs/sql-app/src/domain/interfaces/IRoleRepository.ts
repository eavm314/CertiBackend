import { Role } from "../models/Role";

export interface IRoleRepository {
    findById(id: string): Promise<Role | null>;
    createRole(user: Role): Promise<Role>;
    deleteRole(id: string): Promise<void>;
    updateRole(roleId: string, updateData: Partial<Role>): Promise<Role>;
}
