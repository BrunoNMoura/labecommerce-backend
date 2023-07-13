import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const [product] = await db("products").where({ id: idToDelete });

    if (!product) {
      res.status(400);
      throw new Error("'id' not found!");
    }
    await db("products").del().where({ id: idToDelete });

    res.status(200).send("product deleted successfully!");
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
