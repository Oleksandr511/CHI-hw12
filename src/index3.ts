import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController2 as UserController } from "./controllers/UserController2";
import express from "express";
import { AppDataSource } from "./data-source/data-source";

const port = 4000;

const app = createExpressServer({
  controllers: [UserController],
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeDatabase = async () => {
  await AppDataSource.initialize();
  console.log("Database connected");
};

initializeDatabase();

app.listen(port, () => {
  console.log(`Server2 is running on port ${port}`);
});
