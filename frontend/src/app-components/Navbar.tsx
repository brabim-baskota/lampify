"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
    Search,
    ShoppingBag,
    User,
    Menu,
    X,
    Lightbulb,
    ChevronDown,
    LogOut,
    LayoutDashboard
} from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<{ name: string; role: string } | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsUserMenuOpen(false);
        router.push("/login");
    };

    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/shop" },
        {
            name: "Categories",
            href: "/shop",
            dropdown: [
                { name: "Table Lamps", href: "/shop?category=table" },
                { name: "Floor Lamps", href: "/shop?category=floor" },
                { name: "Wall Lights", href: "/shop?category=wall" },
                { name: "Ceiling Lights", href: "/shop?category=ceiling" },
                { name: "Smart Bulbs", href: "/shop?category=smart" },
                { name: "Outdoor Lighting", href: "/shop?category=outdoor" },
                { name: "Accessories", href: "/shop?category=accessories" },
            ]
        },
        { name: "Offers", href: "/sale" },
        { name: "Contact", href: "/contact" },
    ];

    const navVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    const linkHover = {
        hover: { scale: 1.05, color: "#f59e0b" } // Amber-500
    };

    return (
        <>
            <motion.nav
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg py-3 border-b border-amber-500/10"
                    : "bg-transparent py-5"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 0.5 }}
                            className="bg-amber-500/10 p-2 rounded-full border border-amber-500/20"
                        >
                            <Lightbulb className="w-6 h-6 text-amber-500 logo-glow" />
                        </motion.div>
                        <span className="text-2xl font-bold font-sans tracking-tight dark:text-white logo-glow text-gray-900 group-hover:text-amber-500 transition-colors">
                            Lampify
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            if (link.dropdown) {
                                return (
                                    <div
                                        key={link.name}
                                        className="relative group"
                                        onMouseEnter={() => setHoveredLink(link.name)}
                                        onMouseLeave={() => setHoveredLink(null)}
                                    >
                                        <button
                                            className={`flex items-center gap-1 text-gray-600 dark:text-gray-300 font-medium text-sm group-hover:text-amber-500 transition-colors ${pathname === link.href ? 'text-amber-600 dark:text-amber-400' : ''}`}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        </button>

                                        <AnimatePresence>
                                            {hoveredLink === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 15 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800 p-2 overflow-hidden"
                                                >
                                                    {link.dropdown.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600 rounded-lg transition-colors"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="relative text-gray-600 dark:text-gray-300 font-medium text-sm group"
                                >
                                    <span className={`${pathname === link.href ? 'text-amber-600 dark:text-amber-400' : ''} group-hover:text-amber-500 transition-colors`}>
                                        {link.name}
                                    </span>
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`} />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Icons & Actions */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </motion.button>

                        <Link href="/cart">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-full transition-colors relative"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                {/* Optional: Add cart count bubble here */}
                            </motion.button>
                        </Link>

                        {/* User Profile Dropdown */}
                        <div className="relative">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => user ? setIsUserMenuOpen(!isUserMenuOpen) : router.push('/login')}
                                className="flex items-center gap-2 p-1 pr-3 rounded-full border border-gray-200 dark:border-zinc-800 hover:border-amber-500/50 transition-colors bg-white dark:bg-zinc-900"
                            >
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full">
                                    <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                                </div>
                                {user && (
                                    <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                )}
                            </motion.button>

                            <AnimatePresence>
                                {isUserMenuOpen && user && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-800 py-2 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-zinc-800">
                                            <p className="text-xs text-gray-500">Signed in as</p>
                                            <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">{user.name}</p>
                                        </div>

                                        {user.role === 'ADMIN' && (
                                            <Link
                                                href="/admin"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:text-amber-600"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Admin Dashboard
                                            </Link>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-amber-500"
                        >
                            <Menu className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm md:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[280px] bg-white dark:bg-zinc-950 shadow-2xl z-[70] p-6 border-l border-amber-500/10 md:hidden"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <span className="text-xl font-bold font-sans">Menu</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex flex-col space-y-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-lg font-medium p-2 rounded-lg transition-colors ${pathname === link.href
                                            ? "text-amber-600 bg-amber-50 dark:bg-amber-900/20"
                                            : "text-gray-600 dark:text-gray-300 hover:text-amber-500"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800">
                                {!user ? (
                                    <div className="space-y-3">
                                        <Link
                                            href="/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-center py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href="/admin/login"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="block w-full text-center py-2.5 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl font-medium"
                                        >
                                            Admin Portal
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-sm text-gray-500 mb-2">Signed in as {user.name}</p>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl font-medium"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
