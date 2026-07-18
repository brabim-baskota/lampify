"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "LAMP",
        stock: ""
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.role !== 'ADMIN') {
            router.push('/admin/login');
            return;
        }
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure?")) {
            await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        setFormData({ name: "", description: "", price: "", imageUrl: "", category: "LAMP", stock: "" });
        fetchProducts();
    };

    return (
        <div className="p-10 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Product Management</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <h2 className="text-xl font-bold mb-6">Add New Product</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700" required />
                            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700 h-32" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700" required />
                                <input type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700" required />
                            </div>
                            <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700" required />
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-700">
                                <option value="LAMP">Lamp</option>
                                <option value="BULB">Bulb</option>
                            </select>
                            <button type="submit" className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold hover:opacity-90 transition">
                                + Add Product
                            </button>
                        </form>
                    </div>
                </div>

                <div>
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800">
                        <h2 className="text-xl font-bold mb-6">Inventory ({products.length})</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {products.map(product => (
                                <div key={product.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{product.name}</h3>
                                            <p className="text-sm text-gray-500">${product.price} • {product.stock} in stock</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded transition">
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
