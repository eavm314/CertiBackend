import "reflect-metadata";
import { db } from "./config";
import { DataSource } from "typeorm";
import { UserEntity } from "../entities/UserEntity";
import { RoleEntity } from "../entities/RoleEntity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: db.host,
    port: db.port,
    username: db.user,
    password: db.password,
    database: db.name,
    synchronize: true,
    logging: false,
    entities: [UserEntity, RoleEntity],
    subscribers: [],
    migrations: [],
});