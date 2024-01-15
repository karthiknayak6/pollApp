import React from "react";
import ProgressBar from "./ProgressBar";

export default function SingleOptionDetailsView() {
  return (
    <div className="px-12 pb-9 pt-1">
      <p className="ml-3 mb-1 sm:text-md text-sm">Coffee</p>
      <div className="flex">
        <ProgressBar />

        <div className="ml-5">69%</div>
      </div>
      <p className="ml-4 text-sm mt-1">2787 votes</p>
    </div>
  );
}
