"use client";
import Layout from "@/components/Layout";
import SingleOptionDetailsView from "@/components/SingleOptionDetailsView";
import React from "react";

export default function PollDetails({ params }: any) {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-xl w-full p-8 space-y-4 bg-white rounded-lg shadow-md">
          <p className="flex justify-between mb-8">
            <span>posted by karthik23</span>
            <span>Total votes: 9877</span>
          </p>
          <div className="text-xl font-semibold text-gray-600">
            What is your favourite drink?
          </div>
          <SingleOptionDetailsView />
          <SingleOptionDetailsView />
          <SingleOptionDetailsView />
          <SingleOptionDetailsView />
          <p>POLLID:{params.pollId}</p>
        </div>
      </div>
    </Layout>
  );
}
