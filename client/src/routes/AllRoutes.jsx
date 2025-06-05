import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../context/AuthContext";
import Layout from "../pages/Layout";
import DriversRequest from "../pages/DriversRequest";
import ApprovedDrivers from "../pages/ApprovedDrivers";
import AllPassengers from "../pages/AllPassengers";
import SendMessages from "../components/SendMessages";

const AllRoutes = () => {
  const { user } = useAuth();
  return (
    <Routes>
    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
    <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
    <Route element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/driver-requests" element={<DriversRequest/>} />
        <Route path="/drivers" element={<ApprovedDrivers/>} />
        <Route path="/passengers" element={<AllPassengers/>} />
        <Route path="/trips" element={<div>Trips Content</div>} />
        <Route path="/feedback" element={<div>Feedback Content</div>} />
        <Route path="/messages/:role/:name/:id" element={<SendMessages/>} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
