"use client";
import React from "react";
import Navbar from "../../app-components/Navbar";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

const saleItems = [
    {
        id: 1,
        name: "Aura Minimalist Desk Lamp",
        originalPrice: 129.99,
        salePrice: 89.99,
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        discount: "30% OFF",
    },
    {
        id: 2,
        name: "Nova Brass Floor Lamp",
        originalPrice: 249.99,
        salePrice: 199.99,
        image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
        discount: "20% OFF",
    },
    {
        id: 3,
        name: "Lumina Smart Pendant",
        originalPrice: 189.99,
        salePrice: 139.99,
        image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
        discount: "26% OFF",
    },
];

export default function SalePage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black pt-28 pb-20">
            <Navbar />
            
            <div className="container mx-auto px-6 max-w-7xl">
                {/* Sale Hero */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden mb-16 bg-amber-900"
                >
                    <div className="absolute inset-0">
                        <img 
                            src="https://images.pexels.com/photos/705194/pexels-photo-705194.jpeg" 
                            alt="Sale Background" 
                            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                    </div>
                    
                    <div className="relative z-10 p-12 md:p-24 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm font-semibold mb-6 uppercase tracking-wider">
                            <Clock className="w-4 h-4" /> Limited Time Offer
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                            The Seasonal <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Lighting Sale</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 max-w-md">
                            Elevate your space with our premium collection at exclusive prices. Up to 40% off selected items.
                        </p>
                    </div>
                </motion.div>

                {/* Sale Products Grid */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Tag className="w-6 h-6 text-amber-500" /> Exclusive Offers
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {saleItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-zinc-800"
                        >
                            <div className="relative h-[300px] overflow-hidden">
                                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
                                    {item.discount}
                                </div>
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-2xl font-bold text-amber-600 dark:text-amber-500">${item.salePrice}</span>
                                    <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                                </div>
                                <Link 
                                    href={`/shop`} 
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 text-gray-900 dark:text-white font-medium rounded-xl transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
