import { Request, Response } from "express";
import { products } from "../database";
//import { TProduct } from "../types";
import { db } from "../database/knex";

export const postProducts = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    // const newProduct: TProduct = {
    //   id,
    //   name,
    //   price,
    //   description,
    //   imageUrl,
    // };

    //check id

    if (id && id[0] !== "p") {
      res.status(400);
      throw new Error("Id must start with character 'p'");
    }

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

    //check only id

    const [product] = await db.raw(`SELECT * FROM products
    WHERE id = "${id}"`)
    if(!product){
      res.status(400);
      throw new Error ("The given ID already exists")
    }

    // const existingId = products.find((product) => product.id === id);
    // if (existingId) {
    //   res.status(400);
    //   throw new Error("The given ID already exists");
    // }

    await db.raw(`INSERT INTO products (id, name, price, description, imageUrl)
      VALUES ("${id}","${name}","${price}","${description}","${imageUrl}")`);

    res.status(201).send("Product registration successfully completed!");
  } catch (error) {
    if (req.statusCode === 200) {
      res.status(500);
    }    
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
};
