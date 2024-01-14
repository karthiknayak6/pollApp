import Layout from "@/components/Layout";
import NewPollBtn from "@/components/NewPollBtn";
import YourPolls from "@/components/YourPolls";
import React from "react";

export default function Home() {
  return (
    <Layout>
      <div className="mt-8 container px-16 ">
        <div className="text-4xl  font-semibold text-gray-700">
          Welcome, Karthik!
        </div>
        <NewPollBtn />
        <div className="">
          <YourPolls />
        </div>
      </div>
    </Layout>
  );
}
