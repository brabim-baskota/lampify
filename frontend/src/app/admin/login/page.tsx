"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../app-components/Navbar";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            if (data.user.role !== 'ADMIN') {
                throw new Error("Access Denied: You do not have administrative privileges.");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Force refresh/redirect to update navbar and state
            window.location.href = "/admin";
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
                <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border-t-4 border-red-600">
                    <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Admin Portal</h1>
                    {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            placeholder="Admin Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
                            required
                        />
                        <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition">
                            Login to Dashboard
                        </button>
                    </form>
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Restricted Area. <Link href="/" className="underline">Return to Home</Link>
                    </p>
                </div>
            </div>
        </>
    );
}
