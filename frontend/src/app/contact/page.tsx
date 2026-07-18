"use client";
import React from "react";
import Navbar from "../../app-components/Navbar";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white dark:bg-black pt-28 pb-20">
            <Navbar />
            
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Whether you have a question about our premium collections, need styling advice, or require support, our team is here to assist you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-12"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-2xl">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Us</p>
                                        <a href="mailto:hello@lampify.com" className="text-lg font-medium text-gray-900 dark:text-white hover:text-amber-500 transition-colors">hello@lampify.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-2xl">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Call Us</p>
                                        <a href="tel:+1234567890" className="text-lg font-medium text-gray-900 dark:text-white hover:text-amber-500 transition-colors">+1 (555) 123-4567</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 rounded-2xl">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visit Our Studio</p>
                                        <p className="text-lg font-medium text-gray-900 dark:text-white">123 Illumination Way<br />New York, NY 10012</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-zinc-50 dark:bg-zinc-900/50 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-zinc-800"
                    >
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button type="button" className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors">
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
