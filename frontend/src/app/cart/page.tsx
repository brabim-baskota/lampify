"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../app-components/Navbar";

interface CartItem {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
    };
}

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.id) {
            fetch(`http://localhost:5000/api/cart/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    setItems(data.items || []);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const removeItem = async (itemId: string) => {
        try {
            await fetch(`http://localhost:5000/api/cart/item/${itemId}`, { method: 'DELETE' });
            setItems(items.filter(item => item.id !== itemId));
        } catch (err) {
            console.error(err);
        }
    };

    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                {loading ? (
                    <p>Loading cart...</p>
                ) : items.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 border rounded-lg items-center">
                                    <img src={item.product.imageUrl || "https://placehold.co/100"} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg">{item.product.name}</h3>
                                        <p className="text-gray-500">Qty: {item.quantity}</p>
                                        <p className="font-semibold">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg h-fit">
                            <h2 className="text-xl font-bold mb-4">Summary</h2>
                            <div className="flex justify-between mb-4">
                                <span>Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <button className="w-full mt-6 py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold hover:opacity-90">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
