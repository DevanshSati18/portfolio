import React, { useState } from "react";
import { auth } from "../firebase/firebaseconfig";
import { signOut } from "firebase/auth";
import Student from "./Student";
import Teacher from "./Teacher";
import BookManagement from "./BookManagement";
const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "sub1":
        return <SubPage1 onBack={() => setActivePage("dashboard")} />;
      case "sub2":
        return <SubPage2 onBack={() => setActivePage("dashboard")} />;
      case "sub3":
        return <SubPage3 onBack={() => setActivePage("dashboard")} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-amber-100 to-orange-200 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full">
              <h1 className="text-3xl font-bold text-orange-600 mb-4">
                Welcome to Dashboard
              </h1>
              

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setActivePage("Student")}
                  className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 rounded-lg shadow transition"
                >
                  Student
                </button>

                <button
                  onClick={() => setActivePage("Teacher")}
                  className="bg-orange-300 hover:bg-orange-400 text-white font-semibold py-2 rounded-lg shadow transition"
                >
                  Teacher
                </button>

                <button
                  onClick={() => setActivePage("BookManagement")}
                  className="bg-orange-200 hover:bg-orange-300 text-orange-700 font-semibold py-2 rounded-lg shadow transition"
                >
                  Book Management
                </button>
              </div>

              <button
                onClick={() => signOut(auth)}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        );
    }
  };

  return renderPage();
};

export default Dashboard;
