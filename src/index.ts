import express, { Request, Response } from "express";
import cors from "cors";
import { getUsers } from "./endPoints/users/getUsers";
import { getProducts } from "./endPoints/products/getProducts";
import { postUsers } from "./endPoints/users/postUsers";
import { postProducts } from "./endPoints/products/postProducts";
import { deleteUsers } from "./endPoints/users/deleteUsers";
import { deleteProduct } from "./endPoints/products/deleteProduct";
import { putUser } from "./endPoints/users/putUser";
import { putProduct } from "./endPoints/products/putProduct";
import { postPurchases } from "./endPoints/purchases/postPurchases";
import { getPurchases } from "./endPoints/purchases/getPurchases";
import { deletePurchase } from "./endPoints/purchases/deletePurcahse";

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

app.get("/products", getProducts);

//creat new user

app.post("/users", postUsers);

//creat new product

app.post("/products", postProducts);

//delete users

app.delete("/users/:id", deleteUsers);

//delete product

app.delete("/products/:id", deleteProduct);

//change user

app.put("/users/:id", putUser);

//change product

app.put("/products/:id", putProduct);

//creat purchase

app.post("/purchases", postPurchases);

//get purchases

app.get("/purchases/:id", getPurchases);

//delete purchase

app.delete("/purchases/:id", deletePurchase)
