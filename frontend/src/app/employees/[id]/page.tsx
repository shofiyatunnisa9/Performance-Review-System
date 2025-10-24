"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useEmployees } from "@/hooks/useEmployees";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { employees, updateEmployee, isUpdating } = useEmployees();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
  });

  const employeeId = Number(params.id);
  const currentEmployee = employees.find((emp: any) => emp.id === employeeId);

  useEffect(() => {
    if (currentEmployee) {
      setFormData({
        name: currentEmployee.name,
        email: currentEmployee.email,
        department: currentEmployee.department,
        position: currentEmployee.position,
      });
    }
  }, [currentEmployee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateEmployee(
      { id, data: formData },
      {
        onSuccess: () => {
          router.push("/employees");
        },
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!currentEmployee) {
    return (
      <div className="max-w-3xl mx-auto mt-10">
        <p>Loading employee data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-center">Edit Employee</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Name :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Email :
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">
            Department :
          </label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Position :
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex gap-3 items-end justify-end">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors font-medium cursor-pointer"
          >
            {isUpdating ? "Updating..." : "Edit"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/employees")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
