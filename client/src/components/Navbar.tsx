import React from "react";

export default function Navbar() {
  return (
    <nav className=" bg-white shadow-md p-4  w-full">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="">Logo</div>
          <div className="flex space-x-4">
            <a href="/login" className=" hover:text-gray-600">
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
