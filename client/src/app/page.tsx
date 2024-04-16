"use client";
import Layout from "@/components/Layout";
import NewPollBtn from "@/components/NewPollBtn";
import YourPolls from "@/components/YourPolls";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Audio, BallTriangle } from "react-loader-spinner";
import Loading from "@/components/Loading";

// ... (imports remain the same)

export default function Home() {
  const [currentUserName, setCurrentUserName] = useState("");
  const [loading, setLoading] = useState(true); // New state to track loading status

  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/currentUser", {
          withCredentials: true,
        });
        setCurrentUserName(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    getUser();
  }, [router]);

  // Conditional rendering based on loading state
  if (loading) {
    return <Loading />; // You can replace this with a loading spinner or any other loading indicator
  }

  // If currentUserName is not available, redirect to the login page
  if (!currentUserName) {
    // You can replace this with your actual login page route
    router.push("/login");
    return null; // Return null to prevent rendering the rest of the component
  }

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
  );
}
