"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SingleOptionDetailsView from "./SingleOptionDetailsView";
import { Poll } from "@/utils/types";
interface SinglePollProps {
  poll: Poll;
}

export const SinglePoll: React.FC<SinglePollProps> = ({ poll }) => {
  console.log(poll);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/poll/${poll._id}`);
  };
  return (
    <div
      onClick={handleClick}
      className=" bg-gray-100 h-fit rounded-full shadow-sm cursor-pointer border-2 border-transparent hover:border-purple-800"
    >
      <div className=" flex justify-between text-gray-800 p-2 pl-5 sm:text-xl text-md mt-4 font-medium ml-10">
        <div>{poll.title}</div>
        <div className=" text-sm text-gray-800 pr-20">
          Total votes: {poll.total_votes}
        </div>
      </div>

      <SingleOptionDetailsView
        options={poll.options}
        total_votes={poll.total_votes}
      />
    </div>
  );
};
3;
