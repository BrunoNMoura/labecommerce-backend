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

const creatUser:TUser= 
  {
    id: "u003",
    name: "Astrodev",
    email: "astrodev@email.com",
    password: "astrodev99",
    createdAt: new Date().toISOString(),
  }

export const getAllUsers = [...users, creatUser]

//getAllUsers.push(users)
//getAllUsers.push(creatUser)


  const newProduct:TProduct = {
    id:"prod003", 
    name:"SSD gamer", 
    price:349.99, 
    description:"Acelere seu sistema com velocidades incríveis de leitura e gravação.",  imageUrl:"https://s2.glbimg.com/EIyqoslaWOshsnac5R7Jijfc6dA=/0x0:1000x1000/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/q/K/9uf0kQROCmG9ETP4171A/productgallery7132.jpg"
  
  }

   export const getAllProducts = [...products, newProduct]
console.log("Produto criado com sucesso");
