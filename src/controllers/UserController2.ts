import {
  Get,
  Param,
  Post,
  Body,
  JsonController,
  Delete,
  Patch,
} from "routing-controllers";
import { ValidateArgs } from "../decorators/validator";
import { User } from "../types/user";
import { AppDataSource } from "../data-source/data-source";
import { Users } from "../entity/Users";

@JsonController("/users")
export class UserController2 {
  @Get("/")
  async getAll() {
    console.log("get all users");
    const users = AppDataSource.getRepository(Users).find();
    console.log(users);
    return users;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const user = AppDataSource.getRepository(Users).findOneBy({ id: 1 });

    if (!user) return { message: "User not found" };
    return user;
  }

  @Post("/")
  @ValidateArgs("Validation string")
  async create(@Body() user: User) {
    try {
      const newUser = AppDataSource.getRepository(Users).create(user);
      await AppDataSource.getRepository(Users).save(newUser);
      return { message: "User created", user };
    } catch (error) {
      console.log(error);
    }
  }

  @Delete("/:id")
  async remove(@Param("id") id: number) {
    try {
      const user = await AppDataSource.getRepository(Users).findOneBy({ id });
      await AppDataSource.getRepository(Users).remove(user as Users);
      return { message: "User removed" };
    } catch (error) {
      return { message: "User not found" };
    }
  }

  @Patch("/:id")
  @ValidateArgs("Validation string")
  async update(@Body() user: User, @Param("id") id: number) {
    try {
      const userToUpdate = await AppDataSource.getRepository(Users).findOneBy({
        id,
      });
      if (!userToUpdate) return { message: "User not found" };
      userToUpdate.name = user.name;
      userToUpdate.email = user.email;
      await AppDataSource.getRepository(Users).save(userToUpdate);
      return { message: "User updated successfully" };
    } catch (error) {
      return { message: "User not found" };
    }
  }
}
