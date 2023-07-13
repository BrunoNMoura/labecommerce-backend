import { Request, Response } from "express";
import { db } from "../../database/knex";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(422);
        throw new Error("The value has to be a string");
      }
      const [nameUser] = await db("users").where({ name: name });
      if (nameUser) {
        res.status(200).send(nameUser);
      }
    }
    const result = await db("users");
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
