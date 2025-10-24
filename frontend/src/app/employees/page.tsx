"use client";

import Link from "next/link";
import { useEmployees } from "@/hooks/useEmployees";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";

export default function EmployeesPage() {
  const { employees, isLoading, isError, deleteEmployee, isDeleting } =
    useEmployees();

  const handleDelete = (id: number | string) => {
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
          <tr className="bg-gray-400">
            <th className="border border-gray-500 p-2 text-center">Name</th>
            <th className="border border-gray-500 p-2 text-center">Email</th>
            <th className="border border-gray-500 p-2 text-center">
              Department
            </th>
            <th className="border border-gray-500 p-2 text-center">Position</th>
            <th className="border border-gray-500 p-2 text-center">Actions</th>
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
                <td className="border border-gray-500 p-2">{emp.name}</td>
                <td className="border border-gray-500 p-2">{emp.email}</td>
                <td className="border border-gray-500 p-2">{emp.department}</td>
                <td className="border border-gray-500 p-2">{emp.position}</td>
                <td className="border border-gray-500 p-3">
                  <div className="flex gap-5 items-center justify-center cursor-pointer">
                    {/* Reviews Button */}
                    <Link href={`/employees/${emp.id}/reviews`}>
                      <MdOutlineRateReview size={20} />
                    </Link>
                    {/* Edit Button */}
                    <Link href={`/employees/${emp.id}`}>
                      <FaEdit size={20} />
                    </Link>

                    {/* Delete Button */}
                    <button onClick={() => handleDelete(emp.id)}>
                      <RiDeleteBin5Fill size={20} />
                    </button>
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
