import React from "react";

export default function NewPollSettings() {
  return (
    <div className="my-4">
      <p className="mb-1">Settings: </p>
      <input
        type="checkbox"
        id="anonymous"
        className="mr-2 cursor-pointer ml-4"
      />
      <label htmlFor="anonymous" className="cursor-pointer">
        Anonymous voting
      </label>
    </div>
  );
}
