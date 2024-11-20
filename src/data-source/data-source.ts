import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "../entity/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "hw13",
  synchronize: false,
  logging: true,
  entities: [Users], 
  migrations: ["../migrations/*.ts"], 
});
