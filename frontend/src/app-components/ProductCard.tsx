"use client";
import Image from "next/image";
import Link from "next/link";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="group relative border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-all">
            <div className="aspect-square w-full relative overflow-hidden bg-gray-100">
                <img
                    src={product.imageUrl || "https://placehold.co/400x400?text=No+Image"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <Link
                        href={`/shop/${product.id}`}
                        className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-medium hover:opacity-80 transition"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}
