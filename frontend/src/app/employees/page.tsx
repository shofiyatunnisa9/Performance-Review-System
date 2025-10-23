"use client";

import Link from "next/link";
import { useEmployees } from "@/hooks/useEmployees";

export default function EmployeesPage() {
  const { employees, isLoading, isError } = useEmployees();

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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
