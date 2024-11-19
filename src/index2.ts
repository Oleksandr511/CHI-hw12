import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import express from "express";

const port = 4000;

const app = createExpressServer({
  controllers: [UserController],
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server2 is running on port ${port}`);
});
