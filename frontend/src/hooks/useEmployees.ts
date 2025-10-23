"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useEmployees() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await api.get("/employees?page=1");
      console.log(res.data.data);
      return res.data.data;
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
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: {
        name: string;
        email: string;
        department: string;
        position: string;
      };
    }) => {
      const res = await api.put(`/employees/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // Delete Employee
  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      const res = await api.delete(`/employees/${id}`);
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

    // Create
    createEmployee: createMutation.mutate,
    isCreating: createMutation.isPending,

    // Update
    updateEmployee: updateMutation.mutate,
    isUpdating: updateMutation.isPending,

    // Delete
    deleteEmployee: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
}
