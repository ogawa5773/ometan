import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "ome",
    synchronize: true,
    logging: false,
    entities: [
        ".build/entity/*.js"
    ],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})
