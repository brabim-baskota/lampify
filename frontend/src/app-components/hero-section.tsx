"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            className="relative h-screen flex items-center justify-center overflow-hidden bg-black group"
            onMouseMove={handleMouseMove}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src="https://images.pexels.com/photos/705194/pexels-photo-705194.jpeg"
                    alt="Hero Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Spotlight / Glow Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                600px circle at ${mouseX}px ${mouseY}px,
                                rgba(245, 158, 11, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-[-80px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-500/20 text-amber-300 text-sm font-semibold tracking-wider mb-6 border border-amber-500/30">
                        PREMIUM LIGHTING COLLECTION
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white tracking-tight leading-tight">
                        Illuminate Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                            Unique Style
                        </span>.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Discover our hand-picked selection of designer lamps, vintage bulbs, and modern lighting solutions that transform any room into a masterpiece.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/shop"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105"
                    >
                        <span className="relative z-10">Shop Collection</span>
                        <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-bold text-lg hover:bg-white/20 transition-all hover:scale-105"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-amber-500 to-transparent animate-pulse" />
                <span className="text-xs text-amber-500/70 tracking-widest uppercase">Scroll</span>
            </motion.div>
        </section>
    );
}
