import { NextResponse } from "next/server";

export async function GET(request){
    const getStoreData = await fetch('https://fakestoreapi.com/products');
    const response = await getStoreData.json();
    const productFinal = response.map((product) =>({
        ...product, quantity: 1
    }))
    // console.log("productFinal-----------:", productFinal)
    return NextResponse.json(productFinal)
}