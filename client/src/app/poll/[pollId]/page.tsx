"use client";
import React, { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import Layout from "@/components/Layout";
import { IOption } from "@/components/YourPolls";
import ProgressBar from "../../../components/ProgressBar";
import io from "socket.io-client";
import { Option, Poll } from "@/utils/types";

export default function PollDetails({ params }: any) {
  const [poll, setPoll] = useState<Poll>({
    __v: 0,
    _id: '',
    author: {
      _id: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      username: '',
      polls: [],
    },
    created_at: '',
    options: [{_id: '', option_name: '', votes: 0 }],
    title: '',
    total_votes: 0,
    voters: [],
  });
  
  const [isVoted, setIsVoted] = useState(false);
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/poll/${params.pollId}`,
          { withCredentials: true }
        );
        const data = response.data;
        if (data) {
        }
        if (!data) throw Error("Fetch failed");
        setPoll(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPoll();
  }, [params.pollId, isVoted]);

  useEffect(() => {
    const socket = io("http://localhost:8080");

    socket.on("updatePoll", (updatedPoll: any) => { 
      setPoll(updatedPoll);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleVote = async (option_id: string, poll_id: string) => {
    const response = await axios.get(
      `http://localhost:8080/poll/${poll_id}/vote/${option_id}`,
      {
        withCredentials: true,
      }
    );
    const data = response.data;
    if (data) {
      if (data === "Already voted") {
        setAlreadyVoted(true);
      } else {
        setIsVoted(true);
      }
    }
  };

  console.log("Poll autherrrr:",poll.author);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full p-8 space-y-4 bg-white rounded-lg shadow-md">
          <p className="flex justify-between mb-8">
            <span>posted by {poll?.author?.username}</span>
            <span>Total votes: {poll?.total_votes}</span>
          </p>
          <div className="text-xl font-semibold text-gray-600">
            {poll?.title}
          </div>
          <div>
            {poll?.options.map((option: Option, index: number) => {
              return (
                <div key={index} className="">
                  <div className="my-3 ml-3">{option.option_name} </div>
                  <div className="flex space-x-2 ">
                    <ProgressBar
                      total_votes={poll?.total_votes}
                      m_votes={option?.votes}
                    />

                    <span>
                      {((option?.votes / poll?.total_votes) * 100) | 0}%
                    </span>
                    <div>
                      <button
                        disabled={isVoted}
                        className=" disabled:bg-slate-400 bg-purple-500 hover:bg-purple-700 text-white text-sm font-bold py-1 px-3 rounded"
                        onClick={() => {
                          handleVote(option._id, poll._id);
                        }}
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {alreadyVoted && (
            <p className=" text-white bg-red-600 rounded-md text-center py-2">
              Already Voted
            </p>
          )}
          {isVoted && (
            <p className=" text-white bg-green-600 rounded-md text-center py-2">
              Successfully voted!
            </p>
          )}
          <p>POLLID:{params.pollId}</p>
        </div>
      </div>
    </Layout>
  );
}
