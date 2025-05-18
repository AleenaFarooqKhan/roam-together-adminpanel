import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../zod/Schemas";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigator = useNavigate();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("fullName", data.fullName);
    formData.append("profilePicture", data.profilePicture[0]);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admins/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Admin registration completed. Redirecting to login page", {
        pauseOnHover: false,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigator("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8  rounded-xl shadow-md max-w-md space-y-6"
      >
        <h2 className="text-3xl text-center font-bold text-gray-800">
          Register as an Admin
        </h2>
        <div>
          <label
            htmlFor="fullName"
            className="block -mb-0.5 font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName")}
            placeholder="Enter Your Full Name"
            id="fullName"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block -mb-0.5 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block -mb-0.5 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="profilePic"
            className="block -mb-0.5 font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            {...register("profilePicture")}
            className="w-full text-gray-700 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.profilePicture && (
            <p className="text-red-500 mt-1 text-sm">
              {errors.profilePicture.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
        <p className="text-center">
          Already an admin of Roam?
          <Link to={"/login"} className="text-blue-500 font-semibold">
             Login
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
