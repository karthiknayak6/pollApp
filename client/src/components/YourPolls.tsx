import React from "react";
import ProgressBar from "./ProgressBar";
import SinglePoll from "./SinglePoll";

export default function YourPolls() {
  return (
    <div className="mt-16">
      <div className="text-3xl font-semibold text-gray-700">Your Polls</div>
      <div className="mt-10 space-y-7 flex flex-col justify-center px-9">
        <SinglePoll />
        <SinglePoll />
        <SinglePoll />
      </div>
    </div>
  );
}
