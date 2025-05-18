import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCar, FaUsers, FaRoad, FaMoneyBillWave, FaStar } from 'react-icons/fa';
import { useApprovedDrivers } from '../context/ApprovedContext';

const Dashboard = () => {
  const {allDrivers,allPassengers} = useApprovedDrivers()
  return (
    <div className="dashboard p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">
        Manage every aspect of the app with ease and precision.
      </h2>
      <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card bg-white shadow-md rounded-lg p-6 text-center">
          <FaCar size={50} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Drivers</h3>
          <p className="text-gray-700 text-xl">{allDrivers.totalDrivers}</p>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-6 text-center">
          <FaUsers size={50} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Passengers</h3>
          <p className="text-gray-700 text-xl">{allPassengers.totalPassengers}</p>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-6 text-center">
          <FaRoad size={50} className="text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Trips</h3>
          <p className="text-gray-700 text-xl">0</p>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-6 text-center">
          <FaMoneyBillWave size={50} className="text-purple-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
          <p className="text-gray-700 text-xl">RS 0</p>
        </div>
        <div className="card bg-white shadow-md rounded-lg p-6 text-center">
          <FaStar size={50} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Total Feedbacks</h3>
          <p className="text-gray-700 text-xl">0</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;