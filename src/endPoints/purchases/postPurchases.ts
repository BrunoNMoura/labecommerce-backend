import { Request, Response } from "express";
import { db } from "../../database/knex";
import { TPurchase, TPurchaseProd } from "../../types";
export const postPurchases = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const buyer = req.body.buyer;
    const total_price = req.body.total_price;
    const products = req.body.products;

    if (id && id[0] !== "o") {
      res.status(400);
      throw new Error("Id must start with character 'o' ");
    }
    if ((total_price && typeof total_price !== "number") || total_price <= 0) {
      res.status(400);
      throw new Error(
        "The 'total_price' must be a number and must be greater than zero"
      );
    }
    if (products && products.lenght < 1) {
      res.status(400);
      throw new Error("incomplete purchase, missing products");
    }

    let invalidProdType: boolean = false;
    let invalidQuantity: boolean = false;
    let prodNoFound: boolean = false;

    for (let product of products) {
      if (product.id && typeof product.id !== "string") {
        invalidProdType = true;
        break;
      } else {
        if (
          product.quantity &&
          typeof product.quantity !== "number" ||
          product.quantity <= 0
        ) {
          invalidQuantity = true;
          break;
        }
      }
    }

    if (invalidProdType) {
      res.status(400);
      throw new Error(
        "'Id product' is requerid and need to be the string type"
      );
    }

    if (invalidQuantity) {
      res.status(400);
      throw new Error(
        "'quantity' is requerid, need to be number type and must be greater than zero"
      );
    }

    const [purchase] = await db("purchases").where({ id: id });
    if (purchase) {
      res.status(400);
      throw new Error("The give ID already exists");
    }

    const [user] = await db("users").where({ id: buyer });
    if (!user) {
      res.status(400);
      throw new Error("'buyer' not found");
    }

    for (let product of products) {
      const [result] = await db("products").where({ id: product.id });
      if (!result) {
        prodNoFound = true;
        break;
      }
    }

    if (prodNoFound) {
      res.status(400);
      throw new Error("Id 'product'not found");
    }

    const newPurchase: TPurchase = {
      id,
      buyer,
      total_price,
    };

    await db("purchases").insert(newPurchase);

    for (let product of products) {
      const newProduct: TPurchaseProd = {
        purchase_id: id,
        product_id: product.id,
        quantity: product.quantity,
      };
      await db("purchases_products").insert(newProduct);
    }

    res.status(201).send("Purchases registration successfully completed!");
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
