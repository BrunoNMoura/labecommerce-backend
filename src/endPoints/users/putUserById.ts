import { Request, Response } from "express";
import { db } from "../../database/knex";

export const putUser = async (req: Request, res: Response) => {
  try {
    const idToEdit = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newEmail = req.body.email;
    const newPassword = req.body.password;

    //check id

    if(newId===undefined || newId === ""){
      res.status(400);
      throw new Error("put a 'id' in the string");
    }

    if (newId[0] !== "u") {
      res.status(400);
      throw new Error("Id must start with character 'u'");
    }

    if(newId.length <3){
      res.status(400)
      throw new Error("The 'id' must be at least three characters long")
    }

    //check name
    if(newName===undefined||newName === ""){
      res.status(400);
      throw new Error("put a name in the string");
    }
    if (typeof newName !== "string") {
      res.status(400);
      throw new Error("The name must be a string");
    }
    if (newName.length < 3) {
      res.status(400);
      throw new Error("The name must be at least three characters long");
    }

    //check email
    
    if (
      !newEmail.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    ) {
      res.status(400);
      throw new Error("Incorrect email format. Try again");
    }

    //check password

    if (
      newPassword &&
      !newPassword.match(
        "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$"
      )
    ) {
      res.status(400);
      throw new Error(
        "Your password must be between 6 and 15 characters, with both uppercase and lowercase letters, and at least one number and one special character."
      );
    }

    const [user] = await db("users").where({ id: idToEdit });

    if (user) {
      const updateUser = {
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      };
      await db("users").update(updateUser).where({ id: idToEdit });
    } else {
      res.status(400).send("User not found!");
    }
    
    res.status(200).send("User changed successfully");
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
