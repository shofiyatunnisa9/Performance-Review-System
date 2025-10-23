"use client";

import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const publicPaths = ["/login", "/register"];
  const isPublic = publicPaths.includes(pathname);

  return (
    <>{isPublic ? children : <ProtectedRoute>{children}</ProtectedRoute>}</>
  );
}
