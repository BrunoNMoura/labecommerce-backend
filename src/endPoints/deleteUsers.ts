import { Request, Response } from "express"
//import { users } from "../database";
import { db } from "../database/knex";

export const deleteUsers = async(req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const [user] = await db.raw(`
      SELECT * FROM users
      WHERE id = "${id}"`)
      if(user){
        await db.raw(`
        DELETE FROM users
        WHERE id = "${id}"`)
      }else{
        res.status(400).send ("User id not found!")
      }
      res.status (200).send ("User deleted successfully!")
      // const findUsersIdex = users.findIndex((user) => {
      //   return user.id === id;
      // });
      // if (findUsersIdex >= 0) {
      //   users.splice(findUsersIdex, 1)};       
      // } else {
      //   res.status(400).send("Usuário não encontrado!");
      // }
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