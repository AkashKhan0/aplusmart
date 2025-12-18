"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UserList() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;

  useEffect(() => {
    if (!token) router.push("/admin/login");
  }, []);

  const fetchUsers = async () => {
    const res = await fetch(`${API}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUsers(Array.isArray(data) ? data : []);
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    await fetch(`${API}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-2">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      <table className="w-full border">
        <thead>
          <tr className="border text-start">
            <th className="user_th_td">Name</th>
            <th className="user_th_td">Email</th>
            <th className="user_th_td">Phone</th>
            <th className="user_th_td">Role</th>
            <th className="user_th_td">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="user_th_td capitalize">{u.fullName || u.resellerName}</td>
              <td className="user_th_td">{u.email}</td>
              <td className="user_th_td">{u.phone}</td>
              <td className="user_th_td capitalize">{u.role}</td>
              <td className="text-center border border-[#c2c2c2] text-lg">
                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-600 font-semibold"
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
