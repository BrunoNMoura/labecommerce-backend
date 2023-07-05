import express, { Request, Response } from "express";
import cors from "cors";
//import { match } from "assert";
import { getUsers } from "./endPoints/getUsers";
import { getProducts } from "./endPoints/getProducts";
import { postUsers } from "./endPoints/postUsers";
import { postProducts } from "./endPoints/postProducts";
import { deleteUsers } from "./endPoints/deleteUsers";
import { deleteProduct } from "./endPoints/deleteProduct";
import { putUser } from "./endPoints/putUser";
import { putProduct } from "./endPoints/putProduct";

//link do postman: https://documenter.getpostman.com/view/26570541/2s93si2Aa1

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//filter users

app.get("/users", getUsers);

//filter products

app.get("/products",getProducts);

//creat new user

app.post("/users", postUsers);

//creat new product

app.post("/products",postProducts);

//delete users

app.delete("/users/:id",deleteUsers);

//delete produto

app.delete("/products/:id",deleteProduct);

//alterar usuário

app.put("/users/:id", putUser);

//alterar produto

app.put("/products/:id", putProduct);
