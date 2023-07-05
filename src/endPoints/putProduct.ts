import { Request, Response } from "express";
import { db } from "../database/knex";

export const putProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;

    //check name
    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(422);
        throw new Error("The 'id' must be a string");
      }
      if (newId.length < 3) {
      res.status(400);
      throw new Error("The 'id' must be at least three characters long");
    }
    }
    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(422);
        throw new Error("The 'name' must be a string");
      }
      if (newName.length < 3) {
      res.status(400);
      throw new Error("The 'name' must be at least three characters long");
    }
    }    
    //check price
    if(newPrice !== undefined){
      if (typeof newPrice !== "number") {
      res.status(422);
      throw new Error("The price must be a number");
    }
    }    
    //check description
    if(newDescription !== undefined){
      if (typeof newDescription !== "string") {
      res.status(422);
      throw new Error("The description must be a string");
    }
    }    
    //check imageUrl
    if(newImageUrl !== undefined){
      if (typeof newImageUrl !== "string") {
      res.status(422);
      throw new Error("The imageUrl must be a string");
    }
    }    

    const [product] = await db.raw(`SELECT * FROM products
    WHERE id = "${id}"`)

    if (product) {
     await db.raw(`
     UPDATE products
     SET
     id = "${newId || product.id}",
     name = "${newName || product.name}",
     price = "${newPrice || product.price}",
     description =  "${newDescription || product.description}";
     imageUrl =  "${newImageUrl || product.imageUrl}"
     WHERE id = "${id}";`);
      res.status(200).send("Product changed successfully!");
    } else {
      res.status(400);
      throw new Error("product not found");
    }
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
