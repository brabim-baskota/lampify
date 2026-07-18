"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, LampFloor } from "lucide-react";

const collections = [
    {
        title: "Designer Lamps",
        description: "Sculptural masterpieces that define your space. From minimalist desk companions to statement floor pieces, elevate your interior with form and function.",
        image: "https://images.pexels.com/photos/13083032/pexels-photo-13083032.jpeg",
        href: "/shop?category=lamp",
        icon: LampFloor,
        color: "from-amber-500 to-orange-500"
    },
    {
        title: "Vintage & Smart Bulbs",
        description: "The soul of the light. Rediscover the warmth of Edison-style filaments or embrace the future with app-controlled smart ambience.",
        image: "https://images.pexels.com/photos/577514/pexels-photo-577514.jpeg",
        href: "/shop?category=bulb",
        icon: Sparkles,
        color: "from-yellow-400 to-amber-300"
    }
];

export default function FeaturedCollection() {
    return (
        <section className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-amber-600 dark:text-amber-400 font-semibold tracking-wider text-sm uppercase mb-3 block">
                        Curated Selections
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                        Featured Collections
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Explore our two primary categories, meticulously sourced to bring the perfect warmth and character to your home.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {collections.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Link href={item.href} className="group block relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                                {/* Background Image with Zoom Effect */}
                                <div className="absolute inset-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>

                                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-amber-200 transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-200 text-lg mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-white font-semibold tracking-wide uppercase text-sm border-b border-white/30 pb-1 w-fit group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
                                        View Products
                                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </div>
                                </div>

                                {/* Shine Effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/20 to-transparent skew-x-[-20deg] -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
