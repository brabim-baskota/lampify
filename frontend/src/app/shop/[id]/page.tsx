"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../app-components/Navbar";

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

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/products/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((err) => console.error(err));
        }
    }, [id]);

    const addToCart = async () => {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user.id) {
            router.push("/login");
            return;
        }

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
                alert("Added to cart!");
                router.push("/cart");
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-600 mb-6">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {product.description}
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={addToCart}
                                className="px-8 py-3 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold hover:opacity-90 transition shadow-lg"
                            >
                                Add to Cart
                            </button>
                            {/* Add to favorites button could go here */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
