"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useEmployees() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/employees?page=1");
      return res.data.items;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      department: string;
      position: string;
    }) => {
      const res = await api.post("/employees", data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    employees: data || [],
    isLoading,
    isError,
    createEmployee: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
