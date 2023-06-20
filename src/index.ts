import express, { Request, Response } from "express";
import cors from "cors";
import { products, users } from "./database";
import { TUser } from "./types";
import { TProduct } from "./types";
import { match } from "assert";

//link do postman: https://documenter.getpostman.com/view/26570541/2s93si2Aa1

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//filter users

app.get("/users", (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(422);
        throw new Error("The value has to be a string");
      }
      const response = users.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase());
      });
      res.status(200).send(response);
    }
    res.status(200).send(users);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});
//filter products

app.get("/products", (req: Request, res: Response) => {
  try {
    const name = req.query.name;
    if (name !== undefined) {
      if (typeof name !== "string") {
        res.status(422);
        throw new Error("The value has to be a string");
      }
      const response = products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
      });
      res.status(200).send(response);
    }
    res.status(200).send(products);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});

//creat new user

app.post("/users", (req: Request, res: Response) => {
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
});
//creat new product

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;

    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    //check id

    if (id && id[0] !== "p") {
      res.status(400);
      throw new Error("Id must start with character 'p'");
    }

    //check name
    if (name && typeof name !== "string") {
      res.status(422);
      throw new Error("The name must be a string");
    }
    if (name && name.length < 2) {
      res.status(400);
      throw new Error("The name must be at least three characters long");
    }

    //check price

    if (price && typeof price !== "number") {
      res.status(422);
      throw new Error("The price must be a number");
    }

    //check description

    if (description && typeof description !== "string") {
      res.status(422);
      throw new Error("The description must be a string");
    }

    //check imageUrl

    if (imageUrl && typeof imageUrl !== "string") {
      res.status(422);
      throw new Error("The imageUrl must be a string");
    }

    //check only id

    const existingId = products.find((product) => product.id === id);
    if (existingId) {
      res.status(400);
      throw new Error("The given ID already exists");
    }

    products.push(newProduct);

    res.status(201).send("cadastro de produto realizado com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});

app.delete("/users/:id", (req: Request, res: Response) => {
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
});

//delete produto

app.delete("/products/:id", (req: Request, res: Response) => {
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
});

//alterar usuário

app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, password } = req.body;
    const findUsers = users.find((user) => {
      return user.id === id;
    });
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
    if (findUsers) {
      findUsers.name = name || findUsers.name;
      findUsers.email = email || findUsers.email;
      findUsers.password = password || findUsers.password;
      res.status(200).send("Usuário alterado com sucesso");
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
});

//alterar produto

app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, price, description, imageUrl } = req.body;
    const findProducts = products.find((product) => {
      return product.id === id;
    });
    //check name
    if (name && typeof name !== "string") {
      res.status(422);
      throw new Error("The name must be a string");
    }
    if (name && name.length < 2) {
      res.status(400);
      throw new Error("The name must be at least three characters long");
    }
    //check price
    if (price && typeof price !== "number") {
      res.status(422);
      throw new Error("The price must be a number");
    }
    //check description
    if (description && typeof description !== "string") {
      res.status(422);
      throw new Error("The description must be a string");
    }
    //check imageUrl
    if (imageUrl && typeof imageUrl !== "string") {
      res.status(422);
      throw new Error("The imageUrl must be a string");
    }

    if (findProducts) {
      findProducts.name = name || findProducts.name;
      findProducts.price = price || findProducts.price;
      findProducts.description = description || findProducts.description;
      findProducts.imageUrl = imageUrl || findProducts.imageUrl;
      res.status(200).send("Produto alterado com sucesso!");
    } else {
      res.status(400).send("produto não localizado");
    }
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unknown error");
    }
  }
});
