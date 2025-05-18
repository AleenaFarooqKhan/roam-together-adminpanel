import React from "react";
import { useApprovedDrivers } from "../context/ApprovedContext";

const ApprovedDrivers = () => {
  const { allDrivers,refreshData } = useApprovedDrivers();
  console.log(allDrivers);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">All Drivers</h1>
      <div className="flex items-center justify-center">
        <div className="overflow-x-auto w-full max-w-6xl shadow-lg rounded-lg bg-white">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                {[
                  "S.No",
                  "First Name",
                  "Last Name",
                  "Phone",
                  "DOB",
                  "Profile picture",
                  "License",
                  "Model",
                  "Front",
                  "Back",
                ].map((heading, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {allDrivers.allDrivers.length > 0
                ? allDrivers.allDrivers.map((driver, idx) => (
                    <tr key={driver._id} className="border-t">
                      <td className="px-4 py-3 text-center">{idx + 1}</td>
                      <td className="px-4 py-3">{driver.firstName}</td>
                      <td className="px-4 py-3">{driver.lastName}</td>
                      <td className="px-4 py-3">{driver.phoneNumber}</td>
                      <td className="px-4 py-3">{new Date(driver.dob).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-center">
                        <img
                          src={driver.profilePicture}
                          alt="Vehicle Front"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3">{driver.licenseNumber}</td>
                      <td className="px-4 py-3">{driver.vehicleModel}</td>
                      <td className="px-4 py-3 text-center">
                        <img
                          src={driver.vehicleFrontPicture}
                          alt="Vehicle Front"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <img
                          src={driver.licenseCertificate}
                          alt="Vehicle Back"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td colSpan="9" className="px-4 py-3 text-center text-lg text-gray-500">No Drivers</td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
      <button
        onClick={refreshData}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Refresh
      </button>
    </div>
  );
};

export default ApprovedDrivers;
