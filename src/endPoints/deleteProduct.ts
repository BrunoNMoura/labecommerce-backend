import { Request, Response } from "express"
import { products } from "../database";

export const deleteProduct = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const findProductsIdex = products.findIndex((product) => {
        return product.id === id;
      });
      if (findProductsIdex >= 0) {
        products.splice(findProductsIdex, 1);
        res.status(200).send("produto deletado com sucesso!");
      }
      res.status(400).send("Produto não encontrado!");
    } catch (error) {
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.status(500).send("Unknown error");
      }
    }
  }