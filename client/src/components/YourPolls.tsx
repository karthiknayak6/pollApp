"use client";

import React, { useEffect, useState } from "react";


import { SinglePoll } from "./SinglePoll";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Poll } from "@/utils/types";

export interface IOption {
  _id: string;
  option_name: string;
  votes: number;
  OptionVoters: [string];
}
export interface IPoll {
  _id: string;
  author: string;
  total_votes: number;
  title: string;
  options: [IOption];
  voters: [string];
  created_at: Date;
}
export default function YourPolls() {
  const router = useRouter();
  const [polls, setPolls] = useState<Poll[]>([]);
  useEffect(() => {
    const res = axios
      .get("http://localhost:8080/polls", {
        withCredentials: true, // Include credentials (cookies) in the request
      })
      .then((res) => {
        console.log(res.data);
        setPolls(res.data);
      })
      .catch((err) => {
        console.log(err);
        router.push("/login");
      });
  }, []);
  useEffect(() => {
    console.log("polls: ", polls);
  }, [polls]);
  return (
    <div className="mt-16">
      <div className="text-3xl font-semibold text-gray-700">Your Polls</div>
      <div className="mt-10 space-y-7 flex flex-col justify-center px-9">
        {polls.length > 0 && polls.map((poll: Poll, index: number) => {
          return <SinglePoll poll={poll} key={index} />;
        })}
      </div>
    </div>
  );
}
