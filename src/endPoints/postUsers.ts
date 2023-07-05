import { Request, Response } from "express"
import { users } from "../database";
import { TUser } from "../types";

export const postUsers = (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const createdAt = req.body.createdAt;
  
      const newUser: TUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };
      //check id
  
      if (id && id[0] !== "u") {
        res.status(400);
        throw new Error("Id must start with character 'u'");
      }
  
      //check name
      if (name && typeof name !== "string") {
        res.status(422);
        throw new Error("The name must be a string");
      }
      if (name && name.length < 3) {
        res.status(400);
        throw new Error("The name must be at least three characters long");
      }
  
      //check email
  
      if (
        email &&
        !email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
      ) {
        res.status(400);
        throw new Error("Incorrect email format. Try again");
      }
  
      //check password
  
      if (
        password &&
        !password.match(
          "^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$"
        )
      ) {
        res.status(400);
        throw new Error(
          "Your password must be between 6 and 15 characters, with both uppercase and lowercase letters, and at least one number and one special character."
        );
      }
  
      //check only id
  
      const existingId = users.find((user) => user.id === id);
      if (existingId) {
        res.status(400);
        throw new Error("The given ID already exists");
      }
  
      //check only email
  
      const existingEmail = users.find((user) => user.email === email);
      if (existingEmail) {
        res.status(400);
        throw new Error("The given email already exists");
      }
  
      users.push(newUser);
  
      res.status(201).send("User registration successfully completed!");
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Unknown error");
      }
    }
  }