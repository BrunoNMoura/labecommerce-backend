import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    if (idToDelete !== undefined) {
      if (typeof idToDelete !== "string" || !idToDelete) {
        res.status(400);
        throw new Error("The value has to be a non-empty string");
      }
      if(idToDelete[0] !=="o"){
        res.status(400);
      throw new Error("Id must start with character 'o'");
      }
      if(idToDelete.length < 4){
        res.status(400);
      throw new Error("The 'id' must be at least four characters long");
      }
    }

    const [purchase] = await db("purchases").where({ id: idToDelete });

    if (!purchase) {
      res.status(400);
      throw new Error("'id' not found!");
    }
    await db.delete().from("purchases").where({ id: idToDelete })

    res.status(200).send("purchase deleted successfully!");
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
