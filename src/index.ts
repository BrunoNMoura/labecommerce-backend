// Criar um repositório
// Clonar o repositório
// Criar uma nova branch para cada nova alteração (git checkout -b "nome-da-branch")
// Criar um package.json (npm init -y)
// Instalar o @type/node e o typescript como devDependencies (npm i @type/node -D e npm i typescript -D )
// Criar a pasta raiz (src) onde vai ficar os arquivos typescript (.ts)
// Criar a pasta (build) onde vai ficar os arquivos transpilados em javascript (.js)
// Criar o tsconfig.json (npx tsc --init)
// Mudar os scripts necessários para rodar o código pelo script (no package.json)
// Fazer o código
// Criar um arquivo para tipagem (types.ts) (qual padrão/tipo que será usado em cada variável)
// Lembrar de exportar quando quiser utiliza-la em outro local/arquivo (export const/type ...)
// Lembrar de importar NO arquivo que será utilizado o arquivo à ser exportado (import {nomeDoArquivo} ./directorio)

import express, { Request, Response } from "express";
import cors from "cors";
import {
  creatProduct,
  creatUser,
  products,
  searchProduct,
  searchUser,
  users,
} from "./database";
import { TUser } from "./types";
import { TProduct } from "./types";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

//filtrar usuarios

app.get("/users", (req: Request, res: Response) => {
  const name = req.query.name as string;
  let response;
  if (name) {
    response = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  } else {
    response = users;
  }
  res.status(200).send(response);
});
//filtrar produtos

app.get("/products", (req: Request, res: Response) => {
  const name = req.query.name as string;
  let response;
  if (name) {
    response = products.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  } else {
    response = products;
  }
  res.status(200).send(response);
});

//criar novo estudante

app.post("/users", (req: Request, res: Response) => {
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
  users.push(newUser);

  res.status(201).send("cadastro de usuário realizado com sucesso!");
});
//criar novo produto

app.post("/products", (req: Request, res: Response) => {
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
  products.push(newProduct);

  res.status(201).send("cadastro de produto realizado com sucesso!");
});

// console.table(users);
// console.table(products);
// console.table(searchUser(users,"fulano"));
// console.table(searchProduct(products,"monitor"));

// console.table(users);
// const newUser = {
//   id: "u004",
//   name: "Astrodev",
//   email: "astrodev@email.com",
//   password: "astrodev99",
//   createdAt: new Date().toISOString(),
// };

// creatUser(newUser);

// console.table(users);

// console.table(products);

// const newProduct = {
//   id: "prod003",
//   name: "SSD gamer",
//   price: 349.99,
//   description:
//     "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
//   imageUrl:
//     "https://s2.glbimg.com/EIyqoslaWOshsnac5R7Jijfc6dA=/0x0:1000x1000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/q/K/9uf0kQROCmG9ETP4171A/productgallery7132.jpg",
// };

// creatProduct(newProduct);

// console.table(products);
