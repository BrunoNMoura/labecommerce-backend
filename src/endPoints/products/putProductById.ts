import { Request, Response } from "express";
import { db } from "../../database/knex";

export const putProduct = async (req: Request, res: Response) => {
  try {
    const idToEdidt = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImageUrl = req.body.imageUrl;

    //check id
    if (newId === undefined || newId === "") {
      res.status(400);
      throw new Error("put ID in the string");
    }
    if (typeof newId !== "string") {
      res.status(422);
      throw new Error("The 'id' must be a string");
    }
    if (newId[0] !== "p") {
      res.status(400);
      throw new Error("Id must start with character 'p'");
    }
    if (newId.length < 3) {
      res.status(400);
      throw new Error("The 'id' must be at least three characters long");
    }
    //check name
    if (newName === undefined || newName === "") {
      res.status(400);
      throw new Error("put a name in the string");
    }
    if (typeof newName !== "string") {
      res.status(422);
      throw new Error("The 'name' must be a string");
    }
    if (newName.length < 3) {
      res.status(400);
      throw new Error("The 'name' must be at least three characters long");
    }

    //check price
    if(newPrice===undefined||newPrice === ""){
      res.status(400);
      throw new Error("put a number");
    }

    if (typeof newPrice !== "number") {
      res.status(422);
      throw new Error("The price must be a number");
    }

    if(newPrice<=0){
      res.status(400);
      throw new Error("Price must be greater than zero");
    }
    //check description
    if(newDescription===undefined||newDescription === ""){
      res.status(400);
      throw new Error("put a description in the string");
    }

    if (typeof newDescription !== "string") {
      res.status(422);
      throw new Error("The description must be a string");
    }
    //check imageUrl
    if(newImageUrl===undefined||newImageUrl === ""){
      res.status(400);
      throw new Error("put a imageUrl in the string");
    }

    if (typeof newImageUrl !== "string") {
      res.status(422);
      throw new Error("The imageUrl must be a string");
    }

    const [product] = await db("products").where({ id: idToEdidt });

    if (product) {
      const updateProduct = {
        id: newId || product.id,
        name: newName || product.name,
        price: newPrice || product.price,
        description: newDescription || product.description,
        imageUrl: newImageUrl || product.imageUrl,
      };

      await db("products").update(updateProduct).where({ id: idToEdidt });
    } else {
      res.status(400);
      throw new Error("product not found");
    }
    res.status(200).send("Product changed successfully!");
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
