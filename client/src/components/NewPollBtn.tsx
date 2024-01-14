"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function NewPollBtn() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/newpoll");
  };
  return (
    <button
      onClick={handleClick}
      className="bg-purple-700 text-white font-bold py-2 px-6 rounded mt-8"
    >
      Create New Poll
    </button>
  );
}
