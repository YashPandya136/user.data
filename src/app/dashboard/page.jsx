"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "@/store/slices/userSlice";
import Sidebar from "@/components/Sidebar";
import MobileViewTable from "@/components/MobileViewTable";
import DesktopTable from "@/components/DesktopTable";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(getUsers());
    if (error) {
      toast.error(error.message);
    }
  }, [dispatch, error]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Toaster position="top-right" />
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 pl-8 lg:pl-0">
              Users
            </h2>
            {/* Mobile view */}
            <div className="block lg:hidden">
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="loader">Loading...</div>
                </div>
              ) : (
                <MobileViewTable users={users} />
              )}
            </div>
            {/* Desktop view */}
            <div className="hidden lg:block">
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-100"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="black"
                        strokeWidth="8"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="black"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                </div>
              ) : (
                <DesktopTable users={users} loading={loading} />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
