import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entities/users";
import { Cryptos } from "../entities/cryptos";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "crypto",
  entities: [Users, Cryptos],
  synchronize: true,
  logging: false,
});