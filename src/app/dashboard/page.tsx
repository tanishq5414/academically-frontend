"use client";
import { redirect } from "next/navigation";

import Navbar from "@/app/components/navbar";
import { Loader } from "@/components/ui/loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getUserInfo } from "@/lib/api";

const DashboardPage = () => {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!localStorage.getItem("user") && !localStorage.getItem("token")) {
        redirect("/login");
      }

      //get user from api
      const response = await getUserInfo();
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  if (isError || !user) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen py-2 bg-[#fbfbfb]">
        <div className="w-full flex flex-col items-center justify-center bg-[#fbfbfb]">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;