"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useReviews(employeeId: number) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", employeeId],
    queryFn: async () => {
      const res = await api.get(`/employees/${employeeId}/reviews`);
      return res.data.data;
    },
    enabled: !!employeeId,
  });

  const createMutation = useMutation({
    mutationFn: async (review: {
      review_date: string;
      score: number;
      comments: string;
    }) => {
      const res = await api.post(`/employees/${employeeId}/reviews`, review);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", employeeId] });
    },
  });

  return {
    reviews: data || [],
    isLoading,
    isError,
    createReview: createMutation.mutate,
    isCreating: createMutation.isPending,
  };
}
