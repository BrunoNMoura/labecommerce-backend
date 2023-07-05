import { Request, Response } from "express"
import { users } from "../database";

export const deleteUsers = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const findUsersIdex = users.findIndex((user) => {
        return user.id === id;
      });
      if (findUsersIdex >= 0) {
        users.splice(findUsersIdex, 1);
        res.status(200).send("Usuário deletado com sucesso!");
      } else {
        res.status(400).send("Usuário não encontrado!");
      }
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Unknown error");
      }
    }
  }