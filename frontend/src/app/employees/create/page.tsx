"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEmployees } from "@/hooks/useEmployees";

export default function CreateEmployeePage() {
  const { createEmployee, isCreating } = useEmployees();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEmployee(form, {
      onSuccess: () => router.push("/employees"),
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          className="w-full border p-2 rounded text-gray-500"
        />
        <button
          type="submit"
          disabled={isCreating}
          className="bg-blue-500 text-white w-full py-2 rounded-lg cursor-pointer"
        >
          {isCreating ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/employees")}
          className="bg-gray-500 text-white w-full py-2 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
