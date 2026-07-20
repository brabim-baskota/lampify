"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../app-components/Navbar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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

export default function CheckoutPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
            router.push("/login");
            return;
        }
        fetch(`http://localhost:5000/api/cart/${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data.items || []);
                setLoading(false);
                if (data.items?.length === 0) {
                    router.push("/cart");
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load cart.");
                setLoading(false);
            });
    }, [router]);

    const handleConfirmOrder = async () => {
        setProcessing(true);
        setError("");
        try {
            const user = JSON.parse(localStorage.getItem("user") || "{}");
            const res = await fetch("http://localhost:5000/api/orders/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create order");
            }

            router.push("/orders");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setProcessing(false);
        }
    };

    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-6 py-10 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Checkout</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-xl shadow-sm"
                    >
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border-b pb-4">
                                    <div className="flex items-center gap-4">
                                        <img src={item.product.imageUrl || "https://placehold.co/50"} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                        <div>
                                            <p className="font-semibold">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-xl font-bold mb-6">
                                <span>Total to Pay</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            {error && <p className="text-red-500 mb-4">{error}</p>}

                            <button 
                                onClick={handleConfirmOrder} 
                                disabled={processing}
                                className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-opacity"
                            >
                                {processing ? "Processing..." : "Confirm Order"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </>
    );
}
