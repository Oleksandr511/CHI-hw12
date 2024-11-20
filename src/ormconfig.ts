import { DataSource } from "typeorm";
import { NewsPost } from "./entity/NewsPost";
import { Users } from "./entity/Users";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "hw13",
  migrations: ["./src/migrations/*.ts"],
  synchronize: false,
  entities: [NewsPost, Users, __dirname + "/entities/**/*.entity.ts"],
});
