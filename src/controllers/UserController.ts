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
// import { readUsers, User } from "../index1";
import { promises as fs, write } from "fs";
import { readUsers, writeUsers } from "../utils/fileUsing";
import { User } from "../types/user";

class Tets {
  constructor() {}

  @ValidateArgs("Test string")
  test(obj: any) {
    console.log(obj);
  }
}

@JsonController("/users")
export class UserController {
  @Get("/")
  async getAll() {
    console.log("get all");
    const users = await readUsers();
    console.log(users);
    return users;
  }

  @Get("/:id")
  async getOne(@Param("id") id: number) {
    const users = await readUsers();

    const user = users.find((user) => Number(user.id) === id);
    if (!user) return { message: "User not found" };
    return user;
  }

  @Post("/")
  @ValidateArgs("Validation string")
  async create(@Body() user: User) {
    console.log(user);
    const users = await readUsers();
    user.id = String(Number(users.length) + 1);
    users.push(user);
    await writeUsers(users);
    return { message: "User created", user };
  }

  @Delete("/:id")
  async remove(@Param("id") id: number) {
    const users = await readUsers();
    const filteredUsers = users.filter((user) => Number(user.id) !== id);
    if (filteredUsers.length === users.length)
      return { message: "User not found" };
    await writeUsers(filteredUsers);
    return { message: "User deleted" };
  }

  @Patch("/:id")
  @ValidateArgs("Validation string")
  async update(@Body() user: User, @Param("id") id: number) {
    const users = await readUsers();
    const userIndex = users.findIndex((user) => Number(user.id) === id);
    if (userIndex === -1) return { message: "User not found" };
    users[userIndex] = { ...users[userIndex], ...user };
    await writeUsers(users);
    return { message: "User updated", user: users[userIndex] };
  }
}
