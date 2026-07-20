"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../../app-components/AdminSidebar";
import { useRouter } from "next/navigation";

interface Order {
    id: string;
    userId: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    user: {
        name: string;
        email: string;
    };
    items: {
        quantity: number;
        product: { name: string };
    }[];
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchOrders = () => {
        fetch("http://localhost:5000/api/orders/admin/all")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== "ADMIN") {
            router.push("/");
            return;
        }
        fetchOrders();
    }, [router]);

    const updateStatus = async (orderId: string, status: string) => {
        try {
            await fetch(`http://localhost:5000/api/orders/admin/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-900">
            <AdminSidebar />
            <div className="flex-1 p-8 ml-64">
                <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>
                
                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 dark:bg-zinc-700 border-b dark:border-zinc-600">
                                    <th className="p-4 font-semibold text-sm">Order ID</th>
                                    <th className="p-4 font-semibold text-sm">Customer</th>
                                    <th className="p-4 font-semibold text-sm">Date</th>
                                    <th className="p-4 font-semibold text-sm">Total</th>
                                    <th className="p-4 font-semibold text-sm">Status</th>
                                    <th className="p-4 font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700">
                                        <td className="p-4 text-sm font-mono text-gray-500">{order.id.slice(0, 8)}...</td>
                                        <td className="p-4">
                                            <p className="font-semibold">{order.user?.name || "Unknown"}</p>
                                            <p className="text-sm text-gray-500">{order.user?.email}</p>
                                        </td>
                                        <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 font-semibold">${order.totalAmount.toFixed(2)}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                                                order.status === 'PAID' ? 'bg-green-100 text-green-800' :
                                                order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'DELIVERED' ? 'bg-purple-100 text-purple-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className="border rounded p-1 text-sm bg-white dark:bg-zinc-800"
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="PAID">PAID</option>
                                                <option value="SHIPPED">SHIPPED</option>
                                                <option value="DELIVERED">DELIVERED</option>
                                                <option value="CANCELLED">CANCELLED</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
