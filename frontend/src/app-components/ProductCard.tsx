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
        <div className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-800 flex flex-col h-full">
            <div className="relative h-[300px] overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0">
                <img
                    src={product.imageUrl || "https://placehold.co/400x400?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 flex-grow">{product.description}</p>
                <div className="flex items-center gap-3 mb-5 mt-auto">
                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-500">${product.price.toFixed(2)}</span>
                </div>
                <Link
                    href={`/shop/${product.id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 text-gray-900 dark:text-white font-medium rounded-xl transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
