"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SingleOptionDetailsView from "./SingleOptionDetailsView";
export default function SinglePoll() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/poll/0000");
  };
  return (
    <div
      onClick={handleClick}
      className=" bg-gray-100 h-fit rounded-full shadow-sm cursor-pointer border-2 border-transparent hover:border-purple-800"
    >
      <div className=" p-2 pl-5 sm:text-xl text-md mt-4 font-medium ml-10">
        What is your favourite drink?
      </div>
      <SingleOptionDetailsView />
    </div>
  );
}
3;
