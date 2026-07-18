"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState({ users: 0, products: 0, carts: 0, revenue: 0 });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== 'ADMIN') {
            router.push('/admin/login');
            return;
        }

        // Fetch stats
        fetch("http://localhost:5000/api/stats")
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));

    }, []);

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Welcome back, Admin</h1>
            <p className="text-gray-500 mb-10">Here is what is happening with your store today.</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <p className="text-sm text-gray-500 mb-1">Total Users</p>
                    <h2 className="text-3xl font-bold">{stats.users}</h2>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <p className="text-sm text-gray-500 mb-1">Total Products</p>
                    <h2 className="text-3xl font-bold">{stats.products}</h2>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <p className="text-sm text-gray-500 mb-1">Active Carts</p>
                    <h2 className="text-3xl font-bold">{stats.carts}</h2>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                    <p className="text-sm text-gray-500 mb-1">Estimated Revenue</p>
                    <h2 className="text-3xl font-bold text-green-600">${stats.revenue.toFixed(2)}</h2>
                </div>
            </div>

            {/* Recent Activity Mockup */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                <h3 className="text-lg font-bold mb-6">Recent System Activity</h3>
                <div className="space-y-6">
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <p className="text-sm">System started successfully</p>
                        <span className="text-xs text-gray-400 ml-auto">Just now</span>
                    </div>
                    <div className="flex items-center gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <p className="text-sm">Stats module inititalized</p>
                        <span className="text-xs text-gray-400 ml-auto">1 min ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
