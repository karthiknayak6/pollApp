// NewPoll.tsx

"use client";
import Layout from "@/components/Layout";
import NewOption from "@/components/NewOption";
import NewPollSettings from "@/components/NewPollSettings";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function NewPoll() {
  const router = useRouter();
  const [options, setOptions] = useState<{ option_name: string }[]>([
    { option_name: "" },
    { option_name: "" },
  ]);
  const [title, setTitle] = useState("");
  const handleNewOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOptions([...options, { option_name: "" }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, options);

    try {
      const response = await axios.post(
        "http://localhost:8080/newPoll",
        { title, options: options },
        { withCredentials: true }
      );

      router.push("/");

      const data = response.data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className=" text-center text-xl font-semibold text-gray-700">
            Create a new Poll
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="">Title:</label>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                type="text"
                className="mt-1 p-3 block w-full border rounded-md focus:outline-none focus:border-purple-700"
                placeholder="Enter the title of your poll"
              />
            </div>
            <div className="my-4">
              <label>Options:</label>
              <div>
                {options.map((option, index) => (
                  <NewOption
                    key={index}
                    option={option}
                    options={options}
                    setOptions={setOptions}
                  />
                ))}
                <button
                  type="submit"
                  onClick={handleNewOption}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-100 hover:bg-gray-200 mt-4 focus:outline-none "
                >
                  Add
                </button>
              </div>
              <NewPollSettings />
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
              >
                Create Poll
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
