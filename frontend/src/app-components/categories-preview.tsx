"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        name: "Table Lamps",
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        href: "/shop?category=table",
        itemCount: "24 Items"
    },
    {
        name: "Floor Lamps",
        image: "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg",
        href: "/shop?category=floor",
        itemCount: "18 Items"
    },
    {
        name: "Ceiling Lights",
        image: "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg",
        href: "/shop?category=ceiling",
        itemCount: "32 Items"
    },
    {
        name: "Wall Lights",
        image: "https://images.pexels.com/photos/1487828/pexels-photo-1487828.jpeg",
        href: "/shop?category=wall",
        itemCount: "15 Items"
    },
    {
        name: "Smart Bulbs",
        image: "https://images.pexels.com/photos/317355/pexels-photo-317355.jpeg",
        href: "/shop?category=smart",
        itemCount: "42 Items"
    },
    {
        name: "Outdoor",
        image: "https://images.pexels.com/photos/2082087/pexels-photo-2082087.jpeg",
        href: "/shop?category=outdoor",
        itemCount: "12 Items"
    }
];

export default function CategoriesPreview() {
    return (
        <section className="py-24 bg-white dark:bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4 text-gray-900 dark:text-white">
                            Shop by <span className="font-medium text-amber-500">Category</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Explore our meticulously curated lighting collections designed to illuminate every space in your home.
                        </p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link 
                            href="/shop" 
                            className="group flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-gray-900 dark:text-white hover:text-amber-500 transition-colors"
                        >
                            View All Categories
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={category.href} className="group block relative h-[350px] rounded-2xl overflow-hidden cursor-pointer">
                                <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800">
                                    <img 
                                        src={category.image} 
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient overlay for premium contrast */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                                </div>
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-semibold text-white mb-2">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {category.itemCount}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-amber-500 text-white">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
