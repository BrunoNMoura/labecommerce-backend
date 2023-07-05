import { Request, Response } from "express"
import { users } from "../database";
import { db } from "../database/knex";

export const getUsers = async(req: Request, res: Response) => {
    try {
      const name = req.query.name;
      if (name !== undefined) {
        if (typeof name !== "string") {
          res.status(422);
          throw new Error("The value has to be a string");
        }
        const response = users.filter((user) => {
          return user.name.toLowerCase().includes(name.toLowerCase());
        });
        res.status(200).send(response);
      }
      const result = await db.raw(`SELECT * FROM users;`)
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