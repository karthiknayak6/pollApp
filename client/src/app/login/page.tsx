"use client";
import Layout from "@/components/Layout";
import { TLoginSchema, loginSchema } from "@/utils/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Audio, BallTriangle } from "react-loader-spinner";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    setIsLoggedIn(false);
    //
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/login", data, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
      if (!response.data) {
        throw new Error("Registration failed");
      }
      if (response.data.errors) {
        const formKeys: (keyof TLoginSchema)[] = Object.keys(
          response.data.errors
        ) as (keyof TLoginSchema)[];

        for (let key of formKeys) {
          if (response.data.errors.hasOwnProperty(key)) {
            let value = response.data.errors[key];

            setError(key, {
              type: "server",
              message: value,
            });
          }
        }

        throw new Error("Login failed");
      }
      setIsLoggedIn(true);
      router.push("/");
    } catch (err) {
      if (err instanceof Error)
        console.error("Registration error:", err.message);
    } finally {
      setIsLoading(false);
    }
    console.log(data);
  };
  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#9208c4"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    ); // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-900">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                {...register("username")}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:border-purple-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
              >
                Sign in
              </button>
            </div>
            {isLoggedIn && (
              <p className=" text-white text-center bg-green-600 rounded-md py-1">
                Registered Successfully
              </p>
            )}
            <div className="text-center">
              Don't have an account?{" "}
              <a
                className=" text-blue-700 hover:text-blue-500"
                href="/register"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
