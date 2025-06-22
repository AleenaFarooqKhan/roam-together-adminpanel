import axios from "axios";
import { useEffect, useState } from "react";

const Trips = () => {
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
      <h2 className="text-2xl font-semibold mb-4">Trips</h2>

      {ratings.length === 0 ? (
        <p className="text-center text-gray-500">No trips available.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Driver</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Passenger</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Pickup Location</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Dropoff Location</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Pickup Time</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Distance (km)</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Fare</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Rating</th>
              <th className="py-2 px-4 text-left font-semibold text-gray-700">Comment</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map((feedback) => (
              <tr key={feedback._id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-600">
                  {feedback.driverId.firstName} {feedback.driverId.lastName}
                </td>
                <td className="py-2 px-4 text-gray-600">{feedback.passengerId.username}</td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.reservationId.passengerDetails.pickupLocation}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.reservationId.passengerDetails.dropoffLocation}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {new Date(feedback.reservationId.schedule.pickupTime).toLocaleString()}
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.reservationId.distance.toFixed(2)} km
                </td>
                <td className="py-2 px-4 text-gray-600">
                  {feedback.reservationId.plannedFare} PKR
                </td>
                <td className="py-2 px-4 text-gray-600">{feedback.rating}</td>
                <td className="py-2 px-4 text-gray-600">{feedback.comment || "No comment provided"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Trips;
