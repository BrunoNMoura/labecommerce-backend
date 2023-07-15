import { Request, Response } from "express";
import { TProduct } from "../../types";
import { db } from "../../database/knex";

export const postProducts = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    //check id

    if (id && id[0] !== "p") {
      res.status(400);
      throw new Error("Id must start with character 'p'");
    }

    //check name

    if(name===undefined||name === ""){
      res.status(400);
      throw new Error("put a name in the string");
    }
    if (typeof name !== "string") {
      res.status(400);
      throw new Error("The name must be a string");
    }
    if (name && name.length < 3) {
      res.status(400);
      throw new Error("The name must be at least three characters long");
    }

    //check price

    if(price===undefined||price === ""){
      res.status(400);
      throw new Error("put a number");
    }

    if (typeof price !== "number") {
      res.status(422);
      throw new Error("The price must be a number");
    }

    if(price<=0){
      res.status(400);
      throw new Error("Price must be greater than zero");
    }

    //check description

    if(description===undefined||description === ""){
      res.status(400);
      throw new Error("put a description in the string");
    }

    if (typeof description !== "string") {
      res.status(422);
      throw new Error("The description must be a string");
    }

    //check imageUrl

    if(imageUrl===undefined||imageUrl === ""){
      res.status(400);
      throw new Error("put a imageUrl in the string");
    }

    if (typeof imageUrl !== "string") {
      res.status(422);
      throw new Error("The imageUrl must be a string");
    }

    //check only id

    const [product] = await db("products").where({ id: id });
    if (product) {
      res.status(400);
      throw new Error("The given ID already exists");
    }
    const newProduct: TProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      imageUrl: imageUrl,
    };

    await db("products").insert(newProduct);

    res.status(201).send("Product registration successfully completed!");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
};
