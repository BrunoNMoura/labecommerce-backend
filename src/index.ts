import express, { Request, Response } from "express";
import cors from "cors";
import { getUsers } from "./endPoints/users/getUsersByName";
import { getProducts } from "./endPoints/products/getProductsByName";
import { postUsers } from "./endPoints/users/postUsers";
import { postProducts } from "./endPoints/products/postProducts";
import { deleteUsers } from "./endPoints/users/deleteUsersById";
import { deleteProduct } from "./endPoints/products/deleteProductById";
import { putUser } from "./endPoints/users/putUserById";
import { putProduct } from "./endPoints/products/putProductById";
import { postPurchases } from "./endPoints/purchases/postPurchases";
import { getPurchases } from "./endPoints/purchases/getPurchasesById";
import { deletePurchase } from "./endPoints/purchases/deletePurcahseById";

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
