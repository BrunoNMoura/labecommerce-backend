import { Request, Response } from "express";
import { db } from "../../database/knex";

export const deleteUsers = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [user] = await db("users").where({ id: idToDelete });
    if (!user) {
      res.status(400);
      throw new Error("User id not found!");
    }
    await db("users").del().where({ id: idToDelete });
    res.status(200).send("User deleted successfully!");
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
