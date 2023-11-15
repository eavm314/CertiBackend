import { IRoleEntity } from "../entities/IRoleEntity";
import { v4 as uuidv4 } from 'uuid';

export class Role {
    id: string;
    name: string;
    description: string;

    constructor(roleEntity: IRoleEntity){
        this.id = roleEntity.id || uuidv4();
        this.name = roleEntity.name;
        this.description = roleEntity.description;
    }
}