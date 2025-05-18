import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../zod/Schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // ✅ make sure you import the CSS

const Form = () => {
  const navigator = useNavigate();
  const { login, user } = useAuth();
  const {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      navigator("/");
    }
  }, [user, navigator]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admins/login",
        data
      );

      login(response.data.admin);
      toast.success("Logged in !! redirecting to dashboard...", {
        pauseOnHover: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        navigator("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed", {
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        <p className="text-center">
          Not an admin of Roam?{" "}
          <Link to="/register" className="text-blue-500 font-semibold">
            Register
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
