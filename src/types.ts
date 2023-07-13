
export type TUser = {
    id:string,
    name:string,
    email:string,
    password:string,
    createdAt:string,
}

export type TProduct = {
    id:string,
    name:string,
    price:number,
    description:string,
    imageUrl:string,
}

export type TPurchase = {
    id:string,
    buyer:string,
    total_price:number,
}

export type TPurchaseProd = {
    purchase_id:string,
    product_id:string,
    quantity:number,
}

export type TPurchases = {
    purchaseId:string,
    buyerId:string,
    buyerName:string,
    buyerEmail:string,
    totalPrice:number,
    createdAt:string,
    products:Array<{
        id:string,
        name:string,
        price:number,
        description:string,
        imageUrl:string,
        quantity:number,
    }>
}