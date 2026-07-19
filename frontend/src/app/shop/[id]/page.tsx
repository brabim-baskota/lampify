"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../app-components/Navbar";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Heart, CheckCircle, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
}

export default function ProductDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [id]);

    const addToCart = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
            router.push("/login");
            return;
        }

        setIsAdding(true);
        try {
            const res = await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    productId: product?.id,
                    quantity: 1
                }),
            });
            if (res.ok) {
                // Short delay for visual feedback
                setTimeout(() => {
                    setIsAdding(false);
                    router.push("/cart");
                }, 500);
            }
        } catch (err) {
            console.error(err);
            setIsAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black">
                <Navbar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black">
                <Navbar />
                <div className="flex flex-col justify-center items-center h-screen pt-20">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Product not found</h2>
                    <Link href="/shop" className="text-amber-500 hover:underline flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black pb-24">
            <Navbar />
            
            <div className="container mx-auto px-6 pt-32 max-w-7xl">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-500 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Collection
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-6"
                    >
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden aspect-square border border-gray-100 dark:border-zinc-800 shadow-sm relative group">
                            {product.stock > 0 ? (
                                <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold rounded-full border border-green-500/20 backdrop-blur-md flex items-center gap-1.5">
                                    <CheckCircle className="w-3.5 h-3.5" /> In Stock
                                </div>
                            ) : (
                                <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold rounded-full border border-red-500/20 backdrop-blur-md">
                                    Out of Stock
                                </div>
                            )}
                            
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-105" 
                            />
                        </div>
                    </motion.div>

                    {/* Product Details Column */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col justify-center py-6"
                    >
                        <div className="mb-8 border-b border-gray-100 dark:border-zinc-800 pb-8">
                            <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm mb-3 block">
                                {product.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-light text-gray-900 dark:text-white">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                        
                        <div className="mb-10">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <button
                                onClick={addToCart}
                                disabled={isAdding || product.stock === 0}
                                className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                                    product.stock === 0 
                                    ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                                    : "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                                }`}
                            >
                                {isAdding ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <ShoppingBag className="w-5 h-5" />
                                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                    </>
                                )}
                            </button>
                            
                            <button className="flex items-center justify-center p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-gray-900 dark:text-white rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors group">
                                <Heart className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" />
                            </button>
                        </div>
                        
                        {/* Value Props */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-gray-100 dark:border-zinc-800">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10">
                                <Truck className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Free Shipping</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">On orders over $150</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10">
                                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-500 shrink-0" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">2 Year Warranty</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Guaranteed quality</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
