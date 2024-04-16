"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, dispatch } = useAuth()
  const router = useRouter();
  console.log("STATE: ", user);

  const handleLogOut = async () => {
    try {
      const logout = await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });
      localStorage.removeItem('user')
      dispatch({ type: "LOGOUT" });
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className=" bg-white shadow-md p-4  w-full">
      <div className=" container mx-auto">
        <div className="flex items-center justify-between">
          <div
            onClick={() => router.push("/")}
            className=" text-2xl font-bold text-purple-800 cursor-pointer  "
          >
            PollEz
          </div>
          <div className="flex space-x-4">
            {!user && <a
              href="/login"
              className=" hover:text-gray-400 font-medium text-gray-700 text-lg"
            >
              Login
            </a>}

            {user && <a
              onClick={handleLogOut}
              className=" hover:text-gray-400 text-red-600 font-semibold text-lg cursor-pointer"
            >
              Log out
            </a>}
          </div>
        </div>
      </div>
    </nav>
  );
}
