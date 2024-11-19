import { promises as fs } from "fs";
import { User } from "../types/user";

export const readUsers = async (): Promise<User[]> => {
  const data = await fs.readFile("./files/users.json", "utf-8");
  return JSON.parse(data);
};

export const writeUsers = async (users: User[]) => {
  console.log("u", users);
  await fs.writeFile("./files/users.json", JSON.stringify(users, null, 2));
};
