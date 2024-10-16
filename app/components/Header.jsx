"use client";
import Link from "next/link"; // Correct import for Next.js Link
import { useCart } from "../context/cartContext";
import { useEffect } from "react";

const Header = () => {
    const {cart} = useCart()

    const cartTotal = cart.reduce((acc,item)=>{
        return acc + (item.quantity)
    }, 0)
    useEffect(()=>{
        cartTotal
    },[cart])

    return (
        <nav className="bg-blue-900 border-b border-white-100">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        <Link href="/" className="flex flex-shrink-0 items-center mr-4">
                            <span className="hidden md:block text-white text-2xl font-bold ml-2">My Repos</span>
                            {/* <img className="h-10 w-auto" src={jbLogo} alt="React Jobs" /> */}
                        </Link>
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <Link href="/" className="text-white hover:bg-blue-800 hover:text-white rounded-md px-3 py-2">
                                    Home
                                </Link>
                                <Link href="/myrepos" prefetch={false} className="text-white hover:bg-blue-800 hover:text-white rounded-md px-3 py-2" >My Repos</Link>
                                <Link href="/store" prefetch={false} className="text-white hover:bg-blue-800 hover:text-white rounded-md px-3 py-2" >Store</Link>
                                <Link href="/cart" prefetch={false} className="text-white relative hover:bg-blue-800 hover:text-white rounded-md px-3 py-2" >
                                    Cart
                                    <span className="w-6 h-6 bg-red-500 absolute p-0 text-center top-0 rounded-xl">{cartTotal}</span>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
