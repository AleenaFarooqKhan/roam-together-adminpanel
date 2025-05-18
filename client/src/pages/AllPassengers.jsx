import React, { useEffect } from "react";
import { useApprovedDrivers } from "../context/ApprovedContext";

const AllPassengers = () => {
  const { allPassengers } = useApprovedDrivers();

  useEffect(() => {
    console.log(allPassengers.passengers);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-center font-bold text-3xl mb-8 text-gray-800">
        All Passengers
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
            <tr>
              {["S.No", "Username", "Phone Number", "Registered At"].map((heading, i) => (
                <th key={i} className="px-4 py-3 text-left whitespace-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-gray-700">
            {allPassengers.passengers && allPassengers.passengers.length > 0 ? (
              allPassengers.passengers.map((passenger, idx) => (
                <tr
                  key={passenger._id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{passenger.username}</td>
                  <td className="px-4 py-3">{passenger.phoneNumber}</td>
                  <td className="px-4 py-3">
                    {new Date(passenger.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center py-6 text-gray-400 text-sm"
                  colSpan={4}
                >
                  No passengers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPassengers;
