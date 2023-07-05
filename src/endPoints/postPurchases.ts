import { Request, Response } from "express"; 
import { db } from "../database/knex";
export const postPurchases = async(req:Request, res:Response)=>{
    try {
        const id = req.body.id;
        const buyer = req.body.buyer;
        const total_price = req.body.total_price;

        if(id && id [0] !== "o"){
            res.status(400);
            throw new Error ("Id must start with character 'o'")
        }
        if(buyer && buyer [0] !== "u"){
            res.status(400);
            throw new Error ("Buyer must start with character 'u'")
        }
        if(total_price && typeof total_price !== "number"){
            res.status(400);
            throw new Error ("The 'total_price' must be a number")
        }
        await db.raw(`
        INSERT INTO purchases (id, buyer, total_price)
        VALUES ("${id}","${buyer}","${total_price}")
        `);
        res.status(201).send("Purchases registration successfully completed!")

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
