"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/admin/login");
    };

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: "📊" },
        { name: "Products", href: "/admin/products", icon: "💡" },
        { name: "Orders", href: "/admin/orders", icon: "📦" },
        { name: "Users", href: "/admin/users", icon: "👥" }, // Future
    ];

    return (
        <aside className="w-64 bg-zinc-900 text-white min-h-screen flex flex-col">
            <div className="p-6">
                <h1 className="text-xl font-bold font-mono tracking-widest text-yellow-500">
                    LAMPIFY <span className="text-xs text-white bg-red-600 px-1 rounded ml-1">ADMIN</span>
                </h1>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === item.href
                                ? "bg-yellow-500 text-black font-semibold"
                                : "text-gray-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                    >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-zinc-800">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all text-sm font-medium"
                >
                    <span>🚪</span> Logout
                </button>
                <div className="mt-4 text-xs text-center text-zinc-600">
                    v1.0.0
                </div>
            </div>
        </aside>
    );
}
