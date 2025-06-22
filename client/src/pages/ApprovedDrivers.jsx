import { useApprovedDrivers } from "../context/ApprovedContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
const ApprovedDrivers = () => {
  const { allDrivers, refreshData, setAllDrivers } = useApprovedDrivers();
  console.log(allDrivers);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <h1 className="text-center text-3xl font-semibold text-gray-800 mb-8">
        All Drivers
      </h1>
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
                  "Feedback",
                  "Status",
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
              {allDrivers.allDrivers.length > 0 ? (
                allDrivers.allDrivers.map((driver, idx) => (
                  <tr key={driver._id} className="border-t">
                    <td className="px-4 py-3 text-center">{idx + 1}</td>
                    <td className="px-4 py-3">{driver.firstName}</td>
                    <td className="px-4 py-3">{driver.lastName}</td>
                    <td className="px-4 py-3">{driver.phoneNumber}</td>
                    <td className="px-4 py-3">
                      {new Date(driver.dob).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/messages/${driver.firstName}/${driver._id}`}>
                        <button className="bg-blue-600 rounded-md text-white cursor-pointer px-2 py-1.5">
                          Message
                        </button>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {driver.isBlocked ? (
                        <button
                          className="bg-green-600 rounded-md text-white cursor-pointer px-2 py-1.5"
                          onClick={async () => {
                            try {
                              const blockResponse = await axios.patch(
                                `http://localhost:3000/api/driver/${driver._id}/toggle-block`
                              );
                              setAllDrivers((prev) => ({
                                ...prev,
                                allDrivers: prev.allDrivers.map((d) =>
                                  d._id === driver._id
                                    ? { ...d, isBlocked: false }
                                    : d
                                ),
                              }));
                              toast.success(
                                blockResponse.data.message ||
                                  "Driver unblocked successfully"
                              );
                            } catch (error) {
                              console.error("Error unblocking driver:", error);
                              toast.error(
                                error.response?.data?.message ||
                                  "Failed to unblock driver !!"
                              );
                            }
                          }}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="bg-red-600 rounded-md text-white cursor-pointer px-2 py-1.5"
                          onClick={async () => {
                            try {
                              const blockResponse = await axios.patch(
                                `http://localhost:3000/api/driver/${driver._id}/toggle-block`
                              );
                              toast.success(
                                blockResponse.data.message ||
                                  "Driver blocked successfully"
                              );
                              setAllDrivers((prev) => ({
                                ...prev,
                                allDrivers: prev.allDrivers.map((d) =>
                                  d._id === driver._id
                                    ? { ...d, isBlocked: true }
                                    : d
                                ),
                              }));
                            } catch (error) {
                              console.error("Error blocking driver:", error);
                              toast.error(
                                error.response?.data?.message ||
                                  "Failed to block driver"
                              );
                            }
                          }}
                        >
                          Block
                        </button>
                      )}
                    </td>
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
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-3 text-center text-lg text-gray-500"
                  >
                    No Drivers
                  </td>
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
      <ToastContainer />
    </div>
  );
};

export default ApprovedDrivers;
