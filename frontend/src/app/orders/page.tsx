"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../app-components/Navbar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Order {
    id: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    items: {
        id: string;
        quantity: number;
        priceAtPurchase: number;
        product: {
            name: string;
            imageUrl: string;
        };
    }[];
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
            router.push("/login");
            return;
        }

        fetch(`http://localhost:5000/api/orders/user/${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [router]);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-6 py-10 max-w-5xl">
                <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
                
                {loading ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p>You have no orders yet.</p>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order, index) => (
                            <motion.div 
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-zinc-900 border rounded-xl overflow-hidden shadow-sm"
                            >
                                <div className="bg-gray-50 dark:bg-zinc-800 p-4 border-b flex justify-between items-center flex-wrap gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order Placed</p>
                                        <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total</p>
                                        <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Order ID</p>
                                        <p className="font-semibold">{order.id}</p>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                            order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                            order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'DELIVERED' ? 'bg-purple-100 text-purple-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 space-y-4">
                                    {order.items.map(item => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <img src={item.product.imageUrl || "https://placehold.co/50"} alt={item.product.name} className="w-16 h-16 object-cover rounded-md" />
                                            <div>
                                                <p className="font-semibold">{item.product.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity} x ${item.priceAtPurchase}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
