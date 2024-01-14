"use client";

import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  return (
    <div className="relative w-full ml-3 h-6 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute h-full text-center text-white bg-purple-500"
        style={{ width: `${69}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
