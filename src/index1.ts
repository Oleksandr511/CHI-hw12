import express, { Request, Response } from "express";
import { readUsers, writeUsers } from "./utils/fileUsing";

const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({ author: "Oleksandr Holovchak" });
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await readUsers();
  res.send({ users });
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const users = await readUsers();
  const id = String(users.length + 1);
  await writeUsers(users, { id, name, email });
  res.send({ message: "User added successfully" });
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const users = await readUsers();
  const user = users.find((user) => user.id === id);
  if (user) {
    user.name = name;
    await writeUsers(users);
    res.send({ message: "User updated successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await readUsers();
  const filteredUsers = users.filter((user) => user.id !== id);
  if (filteredUsers.length !== users.length) {
    await writeUsers(filteredUsers);
    res.send({ message: "User deleted successfully" });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
