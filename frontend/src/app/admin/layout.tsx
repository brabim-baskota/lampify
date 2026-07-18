"use client";
import AdminSidebar from "../../app-components/AdminSidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-black">
            <AdminSidebar />
            <main className="flex-1 overflow-auto h-screen">
                {children}
            </main>
        </div>
    );
}
