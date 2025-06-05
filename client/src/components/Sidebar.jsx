import React from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await axios.post("http://localhost:3000/api/admins/logout");
      toast.success("User logged out");
      logout();
    } catch (error) {
      console.log(error);
      toast.error("Error in logging out user");
    }
  };

  const navLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Driver Requests", path: "/driver-requests" },
    { name: "Drivers", path: "/drivers" },
    { name: "Passengers", path: "/passengers" },
    { name: "Trips", path: "/trips" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <div className="fixed top-0 left-0 w-[20%] h-full bg-gray-800 flex flex-col">
      <div className="h-[20%] flex flex-col justify-center items-center p-6 space-y-2">
        <h2 className="text-2xl text-white font-semibold"> Hello,</h2>
        <h2 className="text-2xl text-white font-semibold"> {user.fullName}</h2>
      </div>

      <div className="flex flex-col text-white text-lg px-6 mt-6 space-y-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition duration-300 ${
                isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="px-6 mt-4">
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Sidebar;
