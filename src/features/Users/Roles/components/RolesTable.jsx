import {
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  ShieldCheck,
  Lock,
} from "lucide-react";
import React from "react";
import { rolesData } from "../data/Userdata";

function RolesTable() {
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

            <th className="px-5 py-4 font-semibold">Role Name</th>
            <th className="px-5 py-4 font-semibold">Departmnet</th>
            <th className="px-5 py-4 font-semibold">Current Status</th>
            <th className="px-5 py-4 font-semibold">Permissions Count</th>
            <th className="px-5 py-4 font-semibold">Assigned Users</th>
            <th className="px-5 py-4 font-semibold">Last Modefined</th>
            <th className="px-5 py-4 text-center font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {rolesData.map((role) => (
            <tr
              key={role.id}
              className="border-b border-gray-100 transition-all hover:bg-gray-50"
            >
              {/* Checkbox */}
              <td className="px-5 py-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer rounded border-gray-300"
                />
              </td>

              {/* Role Name */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${role.avatarBg}`}
                  >
                    {role.shortCode}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {role.roleName}
                    </p>

                    {role.isProtected && (
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                        <Lock size={12} />
                        <span>System Protected</span>
                      </div>
                    )}
                  </div>
                </div>
              </td>

              {/* Department */}
              <td className="px-5 py-4">
                {role.department ? (
                  <span className="text-gray-700">
                    {role.department}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>

              {/* Current Status */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-md px-3 py-1 text-xs font-medium ${
                    role.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : role.status === "Protected"
                      ? "bg-gray-100 text-gray-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {role.status}
                </span>
              </td>

              {/* Permissions Count */}
              <td className="px-5 py-4">
                <button className="text-blue-700 underline underline-offset-2 hover:text-blue-900">
                  {role.permissionsCount}{" "}
                  <span className="text-gray-500 no-underline">
                    (Details)
                  </span>
                </button>
              </td>

              {/* Assigned Users */}
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white ${role.assignedUser.bg}`}
                  >
                    {role.assignedUser.initials}
                  </div>

                  <span className="whitespace-nowrap text-gray-700">
                    {role.assignedUser.name}
                  </span>
                </div>
              </td>

              {/* Last Modified */}
              <td className="px-5 py-4 whitespace-nowrap">
                <div className="text-gray-700">
                  <p>{role.lastModifiedDate}</p>
                  <p className="text-xs text-gray-500">
                    {role.lastModifiedTime}
                  </p>
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
                    disabled={role.isProtected}
                    className={`rounded-lg border p-2 transition ${
                      role.isProtected
                        ? "cursor-not-allowed border-gray-100 text-gray-300"
                        : "cursor-pointer border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                    title={
                      role.isProtected
                        ? "System Protected"
                        : "Edit"
                    }
                  >
                    <Pencil size={17} />
                  </button>

                  {/* Delete */}
                  <button
                    disabled={role.isProtected}
                    className={`rounded-lg border p-2 transition ${
                      role.isProtected
                        ? "cursor-not-allowed border-gray-100 text-gray-300"
                        : "cursor-pointer border-red-200 text-red-500 hover:bg-red-50"
                    }`}
                    title={
                      role.isProtected
                        ? "System Protected"
                        : "Delete"
                    }
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

export default RolesTable;