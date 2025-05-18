import axios from "axios";
import { useRequests } from "../context/DriverRequest";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const DriversRequest = () => {
  const { requests, setRequests, refreshRequests } = useRequests();

  // Format DOB to YYYY-MM-DD
  const formatDOB = (dob) => {
    return new Date(dob).toISOString().split("T")[0];
  };
  const handleApprove = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/admins/approve", { id });
      toast.success("Driver Approved");
      setRequests((prev) => prev.filter((driver) => driver._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (id) => {
    try {
      await axios.post("http://localhost:3000/api/admins/reject", { id });
      toast.success("Driver Rejected");
      setRequests((prev) => prev.filter((driver) => driver._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Error rejecting driver");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-center font-bold text-3xl mb-8 text-gray-800">
        Pending Drivers
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-sm text-gray-600 uppercase">
            <tr>
              {[
                "S.No",
                "First Name",
                "Last Name",
                "Phone",
                "DOB" ,
                 "Profile Picture",
                "License",
                "Model",
                "Front",
                "Back",
                "Action",
              ].map((heading, i) => (
                <th key={i} className="px-4 py-3 text-left whitespace-nowrap">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-gray-700">
            {requests.length > 0 ? (
              requests.map((driver, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">{driver.firstName}</td>
                  <td className="px-4 py-3">{driver.lastName}</td>
                  <td className="px-4 py-3">{driver.phoneNumber}</td>
                  <td className="px-4 py-3">{formatDOB(driver.dob)}</td>
                  <td className="px-4 py-3">
                    <img
                      src={driver.profilePicture}
                      alt="Front"
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>

                  <td className="px-4 py-3">{driver.licenseNumber}</td>
                  <td className="px-4 py-3">{driver.vehicleModel}</td>
                  <td className="px-4 py-3">
                    <img
                      src={driver.vehicleFrontPicture}
                      alt="Front"
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={driver.licenseCertificate}
                      alt="Back"
                      className="w-20 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 flex items-center justify-center gap-3">
                    <button
                      className="text-green-500 hover:text-green-600 transition"
                      onClick={() => handleApprove(driver._id)}
                    >
                      <FaCheckCircle size={20} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => handleReject(driver._id)}
                    >
                      <FaTimesCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="text-center py-6 text-gray-400 text-sm"
                  colSpan={10}
                >
                  Nothing to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={refreshRequests}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Refresh
      </button>
      <ToastContainer />
    </div>
  );
};

export default DriversRequest;
