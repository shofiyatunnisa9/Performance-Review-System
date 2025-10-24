"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useReviews } from "@/hooks/useReviews";

export default function EmployeeReviewsPage() {
  const router = useRouter();
  const { id } = useParams();
  const employeeId = Number(id);
  const { reviews, isLoading, isError, createReview, isCreating } =
    useReviews(employeeId);

  const [form, setForm] = useState({
    review_date: "",
    score: 1,
    comments: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "score" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview(form, {
      onSuccess: () => setForm({ review_date: "", score: 1, comments: "" }),
    });
  };

  if (isLoading) return <p>Loading reviews...</p>;
  if (isError) return <p>Gagal memuat data review</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Employee Reviews</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <label className="font-bold">Review Date :</label>
        <input
          type="date"
          name="review_date"
          value={form.review_date}
          onChange={handleChange}
          className="w-full border border-gray-500 p-2 rounded"
          required
        />
        <label className="font-bold">Score (1 - 10) : </label>
        <input
          type="number"
          name="score"
          min={1}
          max={10}
          value={form.score}
          onChange={handleChange}
          className="w-full border border-gray-500 p-2 rounded"
          required
        />
        <label className="font-bold">Comments : </label>
        <textarea
          name="comments"
          value={form.comments}
          onChange={handleChange}
          className="w-full border border-gray-500 p-2 rounded"
        />
        <div className="flex gap-4 items-end justify-end">
          <button
            type="submit"
            disabled={isCreating}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg "
          >
            {isCreating ? "Saving..." : "Add Review"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/employees")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </form>

      <table className="w-full border border-gray-500">
        <thead>
          <tr className="bg-gray-400">
            <th className="border border-gray-500 p-2 text-center">Date</th>
            <th className="border border-gray-500 p-2 text-center">Score</th>
            <th className="border border-gray-500 p-2 text-center">Comments</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center p-4 text-gray-500">
                No reviews found.
              </td>
            </tr>
          ) : (
            reviews.map((r: any) => (
              <tr key={r.id} className="border border-gray-500">
                <td className="border border-gray-500 p-2">
                  {new Date(r.reviewDate).toLocaleDateString()}
                </td>
                <td className="border border-gray-500 p-2">{r.score}</td>
                <td className="border border-gray-500 p-2">{r.comments}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
