import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const SendMessages = () => {
  const [message, setMessage] = useState();
  const { name, id, role } = useParams();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name,
      id,
      role,
      message,
    };
    console.log("Form Data:", body);
    try {
      setLoading(true);
      await axios.post("http://localhost:3000/api/admins/send-message", body);
      toast.success("Message sent");
      setMessage("");
    } catch (error) {
      toast.error("Error sending message");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Send a Message to {name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message:
            </label>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer  text-white py-2 rounded-md hover:bg-blue-700 transition ${
              loading ? "bg-blue-600/40" : "bg-blue-600"
            }`}
          >
            {loading ? "Sending..." : " Send"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SendMessages;
