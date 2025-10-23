"use client";

import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const publicPaths = ["/login", "/register"];
  const isPublic = publicPaths.includes(pathname);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {isPublic ? children : <ProtectedRoute>{children}</ProtectedRoute>}
    </QueryClientProvider>
  );
}
