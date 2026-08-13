import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  ShieldCheck,
  Lock,
} from "lucide-react";
import React from "react";
import { UserData } from "../data/Userdata";

function UserAllTable() {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (index) => {
    const colors = [
      "bg-indigo-700",
      "bg-green-600",
      "bg-orange-500",
      "bg-pink-500",
      "bg-blue-600",
      "bg-purple-600",
      "bg-green-600",
      "bg-orange-500",
    ];

    return colors[index % colors.length];
  };

  return (
    <div className="mt-5 max-h-[450px] overflow-x-auto overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm scrollbar-none">
      <table className="min-w-[1200px] w-full text-sm font-medium " >
        {/* Header */}
        <thead className="sticky top-0 z-40 ">
          <tr className="border-b border-gray-200 text-left text-gray-700 bg-white">
            {/* Checkbox */}
            <th className="w-[55px] px-5 py-4">
              <input
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300"
              />
            </th>

            <th className="px-5 py-4 font-semibold">User</th>
            <th className="px-5 py-4 font-semibold">Email</th>
            <th className="px-5 py-4 font-semibold">Phone Number</th>
            <th className="px-5 py-4 font-semibold">Change Role</th>
            <th className="px-5 py-4 font-semibold">Role</th>
            <th className="px-5 py-4 font-semibold">Current Status</th>
            <th className="px-5 py-4 font-semibold">Last Login</th>
            <th className="px-5 py-4 font-semibold">
              Assigned Permissions
            </th>
            <th className="px-5 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {UserData.map((user, index) => (
            <tr
              key={user.id}
              className="border-b border-gray-100 transition-all hover:bg-gray-200 hover:scale-x-101" 
            >
              {/* Checkbox */}
              <td className="px-5 py-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300"
                />
              </td>

              {/* User */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(
                      index
                    )}`}
                  >
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user.username}
                    </p>
                  </div>
                </div>
              </td>

              {/* Email */}
              <td className="px-5 py-4 whitespace-nowrap text-gray-700">
                {user.email}
              </td>

              {/* Phone */}
              <td className="px-5 py-4 whitespace-nowrap text-gray-700">
                {user.phone}
              </td>

              {/* Change Role */}
              <td className="px-5 py-4">
                <button className="text-blue-700 underline underline-offset-2 hover:text-blue-900">
                  {user.role}
                </button>
              </td>

              {/* Role */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${
                    user.role === "Admin"
                      ? "bg-blue-100 text-blue-700"
                      : user.role === "Manager"
                      ? "bg-purple-100 text-purple-700"
                      : user.role === "Cashier"
                      ? "bg-cyan-100 text-cyan-700"
                      : user.role === "Warehouse"
                      ? "bg-yellow-100 text-yellow-700"
                      : user.role === "Sales Rep"
                      ? "bg-teal-100 text-teal-700"
                      : user.role === "Purchaser"
                      ? "bg-orange-100 text-orange-700"
                      : user.role === "Inventory"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* Current Status */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : user.status === "Inactive"
                      ? "bg-gray-100 text-gray-600"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              {/* Last Login */}
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="text-gray-700">
                  <p>{user.lastLoginDate}</p>
                  <p className="text-xs text-gray-500">
                    {user.lastLoginTime}
                  </p>
                </div>
              </td>

              {/* Permissions */}
              <td className="px-5 py-4">
                <div className="flex flex-col items-start gap-1">
                  <span className="text-gray-700">
                    {user.permissions}{" "}
                    <span className="text-gray-500">(Details)</span>
                  </span>

                  <button className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm hover:bg-gray-50">
                    View Details
                  </button>
                </div>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex justify-center gap-2">
                  {/* View */}
                  <button
                    className="cursor-pointer rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50"
                    title="View"
                  >
                    <Eye size={17} />
                  </button>

                  {/* Edit */}
                  <button
                    className="rounded-lg border cursor-pointer border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50"
                    title="Edit"
                  >
                    <Pencil size={17} />
                  </button>

                  {/* Delete */}
                  <button
                    className="rounded-lg cursor-pointer border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserAllTable;