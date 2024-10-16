"use client"
import { FaTrash, FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import { useCart } from '../context/cartContext';

const CartPage = () => {

    const {cart: cartItems, addToCart, decreaseQuantity, removeCart} = useCart();

    const handleIncrement = (item) =>{
        addToCart(item);
    } 

    const handleDecrement = (id) =>{
        decreaseQuantity(id)
    }

    const handleRemoveItem = (id) =>{
        removeCart(id)
    }
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700">Product</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700">Price</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-center text-sm font-semibold text-gray-700">Quantity</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-right text-sm font-semibold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td>
                    <FaMinusCircle onClick={() => handleRemoveItem(item.id)} className="text-red-500 cursor-pointer" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                    <div>
                      <p className="font-semibold text-gray-700">{item.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-gray-600">$ {item.price}</p>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <FaMinusCircle onClick={() => handleDecrement(item.id)} className="text-red-500 cursor-pointer" />
                    <span className="text-lg">{item.quantity}</span>
                    <FaPlusCircle onClick={() => handleIncrement(item)} className="text-green-500 cursor-pointer" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-gray-600">$ {(item.price * item.quantity).toFixed(2)}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-2xl font-bold">
          Grand Total: ${" "}
          {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
        </h3>
        <button className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
