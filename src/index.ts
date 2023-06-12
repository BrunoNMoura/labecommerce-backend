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

//deletar usuario

app.delete("/users/:id",(req:Request,res:Response)=>{
  const id=req.params.id
  const findUsersIdex = users.findIndex((user)=>{
    return user.id === id
  })
  if(findUsersIdex>=0){
    users.splice(findUsersIdex, 1)
    res.status(200).send("Usuário deletado com sucesso!")
  }else{
    res.status(200).send("Usuário não encontrado!")
  }
})

//delete produto

app.delete("/products/:id",(req:Request,res:Response)=>{
  const id=req.params.id
  const findProductsIdex = products.findIndex((product)=>{
    return product.id === id
  })
  if(findProductsIdex>=0){
    products.splice(findProductsIdex,1)
    res.status(200).send("produto deletado com sucesso!")
  }
    res.status(200).send("Produto não encontrado!")
})

//alterar usuário

app.put("/users/:id",(req:Request,res:Response)=>{
  const id = req.params.id
  const {name,email,password}=req.body
  const findUsers= users.find((user)=>{
    return user.id === id
  })
  if(findUsers){
    findUsers.name=name||findUsers.name
    findUsers.email=email||findUsers.email
    findUsers.password=password||findUsers.password
    res.status(200).send("Usuário alterado com sucesso")
  }else{
    res.status(200).send("Usuário não encontrado!")
  }
})

//alterar produto

app.put("/products/:id",(req:Request,res:Response)=>{
  const id=req.params.id
  const {name,price, description,imageUrl}=req.body
  const findProducts = products.find((product)=>{
    return product.id === id
  })
  if(findProducts){
    findProducts.name=name||findProducts.name
    findProducts.price=price||findProducts.price
    findProducts.description=description||findProducts.description
    findProducts.imageUrl=imageUrl||findProducts.imageUrl
    res.status(200).send("Produto alterado com sucesso!")
  }else{
    res.status(200).send("produto não localizado")
  } 
})