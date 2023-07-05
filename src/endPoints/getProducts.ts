import { Request, Response } from "express"
import { db } from "../database/knex";

export const getProducts = async(req: Request, res: Response) => {
    try {
      const name = req.query.name;
      if (name !== undefined) {
        if (typeof name !== "string") {
          res.status(400);
          throw new Error("The value has to be a string");
        }
        const [product] = await db.raw(`
        SELECT * FROM products
        WHERE name = "${name}"
        `)
        if(product){
          res.status(200).send(product)
        }        
      }
      const result = await db.raw(`SELECT * FROM products;`)
      res.status(200).send(result);
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
  }