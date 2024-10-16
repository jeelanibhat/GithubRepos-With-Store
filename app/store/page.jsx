import Link from "next/link";

// Fetch products from your custom API route
const fetchProducts = async () => {
    const getServerData = await fetch('http://localhost:3000/api/store');
    const response = await getServerData.json();
    // console.log("Fetched Product Data:", response);  // Ensure you see the 'quantity' field here
    return response;  // This should include 'quantity'
}

const StorePage = async () => {
    const data = await fetchProducts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {data.map((product) => (
                <div
                    key={product.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                        <p className="text-gray-600 mt-2 text-sm">{product.category}</p>
                        <p className="text-gray-700 mt-4">{product.description.slice(0, 100)}...</p>
                        <p className="text-gray-600 mt-2">Quantity: {product.quantity}</p> {/* Display Quantity */}
                    </div>
                    <div className="px-4 py-3 bg-gray-100 flex justify-between items-center">
                        <span className="text-lg font-bold text-indigo-600">$ {product.price}</span>
                        <Link href={`/store/${product.id}`} className="bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600">
                            View Details
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StorePage;
