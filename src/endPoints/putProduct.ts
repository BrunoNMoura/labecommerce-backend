import { Request, Response } from "express"
import { products } from "../database";

export const putProduct = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, price, description, imageUrl } = req.body;
      const findProducts = products.find((product) => {
        return product.id === id;
      });
      //check name
      if (name && typeof name !== "string") {
        res.status(422);
        throw new Error("The name must be a string");
      }
      if (name && name.length < 2) {
        res.status(400);
        throw new Error("The name must be at least three characters long");
      }
      //check price
      if (price && typeof price !== "number") {
        res.status(422);
        throw new Error("The price must be a number");
      }
      //check description
      if (description && typeof description !== "string") {
        res.status(422);
        throw new Error("The description must be a string");
      }
      //check imageUrl
      if (imageUrl && typeof imageUrl !== "string") {
        res.status(422);
        throw new Error("The imageUrl must be a string");
      }
  
      if (findProducts) {
        findProducts.name = name || findProducts.name;
        findProducts.price = price || findProducts.price;
        findProducts.description = description || findProducts.description;
        findProducts.imageUrl = imageUrl || findProducts.imageUrl;
        res.status(200).send("Produto alterado com sucesso!");
      } else {
        res.status(400).send("produto não localizado");
      }
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Unknown error");
      }
    }
  }