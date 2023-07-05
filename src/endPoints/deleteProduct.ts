import { Request, Response } from "express"
//import { products } from "../database";
import { db } from "../database/knex";

export const deleteProduct = async(req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const [product] = await db.raw(`      
      SELECT * FROM products
      WHERE id = "${id}"`)
      if(product){
        await db.raw(`
        DELETE FROM products
        WHERE id = "${id}"
        `)
      }else{
        res.status(400).send("product id not found!")
      }
      // const findProductsIdex = products.findIndex((product) => {
      //   return product.id === id;
      // });
      // if (findProductsIdex >= 0) {
      //   products.splice(findProductsIdex, 1)};
        res.status(200).send("product deleted successfully!");    
     
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