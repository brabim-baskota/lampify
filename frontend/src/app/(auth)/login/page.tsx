"use client";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../../../app-components/Navbar";
import { authenticate } from "@/actions/auth";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(authenticate, undefined);
    const searchParams = useSearchParams();
    const isRegistered = searchParams.get("registered") === "true";
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 dark:bg-black pt-16">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-800"
                >
                    <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-6">Log in to your Lampify account.</p>
                    
                    {isRegistered && !state && (
                        <div className="p-3 mb-4 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-sm text-center font-medium">
                            Account created successfully! Please log in.
                        </div>
                    )}

                    {state && (
                        <div className="p-3 mb-4 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg text-sm text-center">
                            {state}
                        </div>
                    )}
                    
                    <form action={formAction} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-black dark:focus:ring-white outline-none transition-all"
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={pending}
                            className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                        >
                            {pending ? "Logging in..." : "Login"}
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account? <Link href="/register" className="font-semibold text-black dark:text-white hover:underline">Sign up</Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
}
