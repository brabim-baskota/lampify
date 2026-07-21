"use client";
import { useActionState } from "react";
import Link from "next/link";
import { authenticate } from "@/actions/auth";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
    const [state, formAction, pending] = useActionState(authenticate, undefined);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-amber-500 mb-2">Admin Portal</h1>
                    <p className="text-gray-400">Restricted Access</p>
                </div>
                
                {state && (
                    <div className="p-3 mb-4 bg-red-900/50 text-red-400 border border-red-500/20 rounded-lg text-sm text-center">
                        {state}
                    </div>
                )}
                
                <form action={formAction} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={pending}
                        className="w-full py-3 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-500 active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {pending ? "Authenticating..." : "Login to Dashboard"}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-500">
                    Not an admin? <Link href="/login" className="text-amber-500 hover:underline">Go to User Login</Link>
                </p>
            </motion.div>
        </div>
    );
}
