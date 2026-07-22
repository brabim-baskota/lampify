"use client";
import React from "react";
import Navbar from "../../app-components/Navbar";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black pt-28 pb-24">
            <Navbar />

            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden rounded-[2rem] border border-gray-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/70 p-10 md:p-14 mb-14 shadow-[0_30px_120px_-60px_rgba(15,23,42,0.25)]"
                >
                    <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-amber-100/60 via-transparent to-transparent dark:from-amber-500/10 pointer-events-none" />
                    <div className="relative text-center max-w-3xl mx-auto">
                        <p className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/70 px-4 py-2 text-sm font-medium text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                            Your lighting partner for faster support
                        </p>
                        <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Elegant support for every lamp, shade, and idea.
                        </h1>
                        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Whether you need product guidance, order help, or inspiration for a fresh room glow, our team is ready to make your experience bright.
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20">
                    <motion.section
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 }}
                        className="rounded-[2rem] border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90 p-8 md:p-10 shadow-sm"
                    >
                        <div className="flex flex-col gap-3 mb-8">
                            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-600 dark:text-amber-400">
                                Contact Information
                            </span>
                            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">We’re here when you need us</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
                                Reach out by email, phone, or visit us in person. We typically reply within one business day.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-[1.5rem] border border-gray-100 dark:border-zinc-800 bg-amber-50/50 dark:bg-amber-500/10 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-amber-600 dark:bg-zinc-950 dark:text-amber-400 shadow-sm">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email us</p>
                                        <a href="mailto:hello@lampify.com" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-amber-500 transition-colors">
                                            hello@lampify.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-gray-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-amber-600 dark:bg-zinc-950 dark:text-amber-400 shadow-sm">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Call our team</p>
                                        <a href="tel:+1234567890" className="text-lg font-semibold text-gray-900 dark:text-white hover:text-amber-500 transition-colors">
                                            +1 (555) 123-4567
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-gray-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-amber-600 dark:bg-zinc-950 dark:text-amber-400 shadow-sm">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visit our studio</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                                            123 Illumination Way<br />New York, NY 10012
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 rounded-3xl border border-amber-200/80 bg-amber-50/70 p-5 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                            <p className="font-semibold">Need help with a larger order?</p>
                            <p className="mt-1 text-gray-600 dark:text-amber-200/80">
                                Our dedicated support specialists can help you select the right fixtures and manage shipping for bulk or commercial design projects.
                            </p>
                        </div>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-[2rem] border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/95 p-8 md:p-10 shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Send a message</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Quick response guaranteed, with stylish support from our lighting experts.
                                </p>
                            </div>
                        </div>

                        <form className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <label className="space-y-2 block">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</span>
                                    <input
                                        type="text"
                                        className="w-full rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-gray-900 dark:text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                                        placeholder="John"
                                    />
                                </label>
                                <label className="space-y-2 block">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</span>
                                    <input
                                        type="text"
                                        className="w-full rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-gray-900 dark:text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                                        placeholder="Doe"
                                    />
                                </label>
                            </div>

                            <label className="space-y-2 block">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</span>
                                <input
                                    type="email"
                                    className="w-full rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-gray-900 dark:text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition"
                                    placeholder="john@example.com"
                                />
                            </label>

                            <label className="space-y-2 block">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</span>
                                <textarea
                                    rows={5}
                                    className="w-full rounded-3xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-gray-900 dark:text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition resize-none"
                                    placeholder="Tell us what you need help with..."
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-3xl bg-amber-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:bg-amber-600"
                            >
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.section>
                </div>
            </div>
        </main>
    );
}
