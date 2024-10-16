"use client";

import { useEffect, useState } from "react";
import { useCart } from "../../context/cartContext";

const Details = ({ params: { slug } }) => {
    const [prod, setProd] = useState({}); // Initialize as an object since we expect a single product

    const {addToCart, cart} = useCart();
    // console.log("cartcart:", cart)

    // Fetch product based on the slug
    const fetchProduct = async () => {
        try {
            const products = await fetch("http://localhost:3000/api/store");
            const response = await products.json();

            // Log the response to debug the format
            console.log("API response:", response);

            // Ensure the response is an array before processing
            if (Array.isArray(response)) {
                // Add quantity to each product
                const productWithQuantity = response.map((item) => ({
                    ...item,
                    quantity: 1
                }));

                // Find the single product based on slug
                const singleProduct = productWithQuantity.find((item) => item.id.toString() === slug);

                console.log("singleProduct:", singleProduct);
                setProd(singleProduct || {}); // Set the found product or an empty object if not found
            } else {
                console.error("Unexpected API response format. Expected an array.");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    useEffect(() => {
        fetchProduct(); // Call fetchProduct on component mount
    }, [slug]);

    // Add to Cart
    const addToCartHandle = (item) => {
        // console.log("Item added to cart:", item);
        addToCart(item);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {prod.image && (
                <img src={prod.image} alt={prod.title} className="w-full h-64 object-cover" />
            )}
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">{prod.title}</h2>
                <p className="text-gray-500 mt-2 text-sm uppercase tracking-wider">{prod.category}</p>
                <p className="text-gray-700 mt-4">{prod.description}</p>

                <div className="mt-6">
                    <span className="text-3xl font-bold text-indigo-600">$ {prod.price}</span>
                </div>

                <div className="mt-8">
                    <button
                        onClick={() => addToCartHandle(prod)}
                        className="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Details;
