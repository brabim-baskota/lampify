"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../../app-components/Navbar";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            router.push("/login?registered=true");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-black">
                <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold mb-6 text-center">Join Lampify</h1>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border rounded-lg dark:bg-zinc-800 dark:border-zinc-700"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
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
                        <button type="submit" className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-lg font-bold hover:opacity-90">
                            Register
                        </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account? <Link href="/login" className="underline">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
}
