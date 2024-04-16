"use client";

import React, { useState, useEffect } from "react";

type ProgressBarProps = {
  total_votes: number;
  m_votes: number;
};

const ProgressBar = ({ total_votes, m_votes }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  console.log(m_votes, total_votes);

  return (
    <div className="relative w-full ml-3 h-6 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute h-full text-center text-white bg-purple-500"
        style={{ width: `${(m_votes / total_votes) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
