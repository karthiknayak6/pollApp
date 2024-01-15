"use client";
import React from "react";

import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
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
            <a
              href="/login"
              className=" hover:text-gray-400 font-medium text-gray-700 text-lg"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
