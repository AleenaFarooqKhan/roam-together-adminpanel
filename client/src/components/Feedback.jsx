import axios from "axios";
import { useEffect, useState } from "react";

const Feedback = () => {
  const [ratings, setRatings] = useState([]);

  const getFeedback = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/all-ratings");
      setRatings(response.data.ratings);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Feedback Table</h2>

      {ratings.length === 0 ? (
        <p className="text-center text-gray-500">No feedback available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Comment
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Driver Name
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Passenger Name
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Rating
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Reservation ID
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Created At
              </th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">
                Updated At
              </th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((feedback) => (
              <tr key={feedback._id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-600">
                  {feedback.comment || "N/A"}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.driverId.firstName || "N/A"}{" "}
                  {feedback.driverId.lastName || ""}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.passengerId.username || "N/A"}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.rating || "N/A"}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.reservationId._id}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {new Date(feedback.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {new Date(feedback.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


export default Feedback;