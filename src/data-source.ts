import "reflect-metadata"
import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Team } from "./entity/Team"
import { Channel } from "./entity/Channel"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "ome",
    synchronize: true,
    logging: false,
    entities: [Team, Channel, User],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})
