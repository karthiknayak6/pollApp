"use client";
import Layout from "@/components/Layout";
import NewPollBtn from "@/components/NewPollBtn";
import YourPolls from "@/components/YourPolls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import withAuth from "@/context/withAuth";

function Home() {
  const [currentUserName, setCurrentUserName] = useState("");
  const [loading, setLoading] = useState(true); // New state to track loading status

  const router = useRouter();

  return (
    <Layout>
      <div className="mt-8 container px-16 mx-auto">
        <div className="text-4xl font-semibold text-gray-700">
          Welcome, {currentUserName}
        </div>
        <NewPollBtn />
        <div className="">
          <YourPolls />
        </div>
      </div>
    </Layout>
    // <h1>Hello World</h1>
  );
}

export default withAuth(Home);
