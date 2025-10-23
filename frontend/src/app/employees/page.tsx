"use client";

import Link from "next/link";
import { useEmployees } from "@/hooks/useEmployees";

export default function EmployeesPage() {
  const { employees, isLoading, isError, deleteEmployee, isDeleting } =
    useEmployees();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id);
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Gagal memuat data</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link
          href="/employees/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Employee
        </Link>
      </div>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Department</th>
            <th className="p-2 text-left">Position</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((emp: any) => (
              <tr key={emp.id} className="border-t">
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2">{emp.position}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <Link
                      href={`/employees/${emp.id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Edit
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(emp.id)}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>

                    {/* Reviews Button */}
                    <Link
                      href={`/employees/${emp.id}/reviews`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                      Reviews
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
