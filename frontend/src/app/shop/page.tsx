"use client";
import React, { useEffect, useState, Suspense } from "react";
import Navbar from "../../app-components/Navbar";
import ProductCard from "../../app-components/ProductCard";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
}

function ShopContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get("category");
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const url = category 
            ? `http://localhost:5000/api/products?category=${category}` 
            : "http://localhost:5000/api/products";
            
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("API Error or invalid data:", data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [category]);

    return (
        <div className="container mx-auto px-6 pb-20 pt-32">
            {category && (
                <div className="mb-8">
                    <h1 className="text-3xl font-light text-gray-900 dark:text-white capitalize">
                        {category} <span className="font-medium text-amber-500">Collection</span>
                    </h1>
                </div>
            )}
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-gray-500">
                    No products found in this category.
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}

export default function Shop() {
    return (
        <div className="bg-white dark:bg-black min-h-screen">
            <Navbar />
            <Suspense fallback={
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
                </div>
            }>
                <ShopContent />
            </Suspense>
        </div>
    );
}
