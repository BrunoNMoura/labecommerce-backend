import { TProduct, TUser } from "./types";

export const users: TUser[] = [
  {
    id: "u001",
    name: "Fulano",
    email: "fulano@email.com",
    password: "fulano123",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@email.com",
    password: "beltrana00",
    createdAt: new Date().toISOString(),
  },
];

export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];


export const searchUser = (users:TUser[], infoName:string):TUser[]=>{
  return users.filter((user)=>{
    return user.name.toLowerCase() === infoName.toLowerCase()
  })
}

export const searchProduct = (products:TProduct[], infoProduct:string):TProduct[]=>{ 
  return products.filter((product)=>{
    return product.name.toLowerCase() === infoProduct.toLowerCase()
  })
}

export const creatUser= (newUser:TUser):void=>{   
  users.push(newUser)
  console.log("Usuario com sucesso!") 
}


  export const creatProduct = (newProduct:TProduct):void=>{ 
    products.push(newProduct)
    console.log("Produto cadastrado com sucesso!");
    
  }
