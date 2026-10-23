"use client";

import React, { useState } from "react";
import { Users, Shield, Plus, Key, Mail, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [usersList] = useState([
    {
      id: "usr_1",
      name: "SaiOrb Lead Administrator",
      email: "admin@saiorb.com",
      role: "admin",
      status: "Active",
    },
    {
      id: "usr_2",
      name: "Content Editor",
      email: "editor@saiorb.com",
      role: "editor",
      status: "Active",
    },
  ]);

  return (
    <div className="space-y-6 text-gray-900">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Users & Roles (RBAC Management)</h1>
          <p className="text-xs text-gray-500 mt-0.5">Role-based access control, administrator accounts, and security permissions</p>
        </div>
        <button
          onClick={() => toast.info("User provisioning form is coming in next release.")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New User
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-3.5">User & Email</th>
              <th className="p-3.5">Access Role</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usersList.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/80 transition">
                <td className="p-3.5">
                  <p className="font-bold text-gray-900">{user.name}</p>
                  <p className="text-[11px] text-gray-400 font-mono">{user.email}</p>
                </td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role === "admin" ? "Super Admin" : "Editor"}
                  </span>
                </td>
                <td className="p-3.5">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {user.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => toast.info(`Password reset link sent to ${user.email}`)}
                    className="px-2.5 py-1 text-gray-700 hover:bg-gray-100 rounded border border-gray-200 text-xs font-semibold cursor-pointer"
                  >
                    Reset Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
