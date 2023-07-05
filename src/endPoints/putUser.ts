import { Request, Response } from "express";
import { db } from "../database/knex";

export const putUser = async(req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;
   
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
    //check name
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
    //check email
    if (newEmail !== undefined) {
      if (
        !newEmail.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
      ) {
        res.status(400);
        throw new Error("Incorrect email format. Try again");
      }
    }
    //check password
    if (newPassword !== undefined) {
      if (
        !newPassword.match(
          "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$"
        )
      ) {
        res.status(400);
        throw new Error(
          "Your password must be between 6 and 15 characters, with both uppercase and lowercase letters, and at least one number and one special character."
        );
      }
    }

    const [user]= await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}";
    `)

    if (user) {
      await db.raw(`
      UPDATE users
      SET
      id = "${newId || user.id}",
      name = "${newName || user.name}",
      email = "${newEmail || user.email}",
      password = "${newPassword || user.password}"
      WHERE id = "${id}";`)
      res.status(200).send("User changed successfully");
    } else {
      res.status(400).send("User not found!");
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
