import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const nameProduct = req.query.name;
    if (nameProduct !== undefined) {
      if (typeof nameProduct !== "string") {
        res.status(400);
        throw new Error("The value has to be a string");        
      }
      if(nameProduct.length<3){
        res.status(400);
      throw new Error("The 'nameProduct' must be at least three characters long");
      }
      const [product] = await db("products").where({ name: nameProduct });
      if (product) {
        res.status(200).send(product);
      }
    }
    const result = await db("products");
    res.status(200).send(result);
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
