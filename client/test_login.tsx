import Layout from "@/components/Layout";
import React from "react";

export default function Login() {
  return (
    <div className="bg-purple-700">
      <div className="flex justify-center items-center  h-screen">
        <div className="text-center w-96 h-[30rem] bg-gray-100 rounded-md shadow-md flex flex-col">
          <div className="h-10 font-semibold bg-white shadow-md rounded-t-md p-8 text-2xl flex justify-center items-center text-gray-600">
            Login
          </div>
          <div className="p-12 flex-grow flex flex-col justify-center space-y-4">
            <form>
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="mb-2 text-gray-600 self-start"
                >
                  Username:
                </label>
                <input
                  id="username"
                  type="text"
                  className="border rounded-md p-2 mb-8"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="mb-2 text-gray-600 self-start"
                >
                  Password:
                </label>
                <input
                  id="password"
                  type="password"
                  className="border rounded-md p-2 mb-10"
                />
              </div>

              <button
                type="submit"
                className="mt-1 bg-purple-700 text-white rounded-md p-2 hover:bg-purple-800 w-full mb-1"
              >
                Login
              </button>
              <span id="error" hidden className="text-red-600">
                username or password is incorrect!
              </span>
              <div className="text-gray-600 font-semibold mt-5">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className=" text-purple-800 hover:text-blue-600"
                >
                  sign up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
