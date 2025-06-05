import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const SendMessages = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      phoneNumber,
      message,
    };
    console.log("Form Data:", body);
    try {
      await axios.post("http://localhost:3000/api/admins/send-message", body);
      toast.success("Message sent");
      setPhoneNumber("");
      setMessage("");
    } catch (error) {
      toast.error("Error sending message");
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Send a Message 📩
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number:
            </label>
            <input
              type="tel"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 0300-1234567"
            />
          </div>
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendMessages;
