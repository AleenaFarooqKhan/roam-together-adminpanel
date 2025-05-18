import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const approvedContext = createContext();

export const ApprovedContextProvider = ({ children }) => {
  const [allDrivers, setAllDrivers] = useState(0);
  const [allPassengers, setAllPassengers] = useState(0);
  const getData = async () => {
    try {
      const drivers = await axios.get(
        "http://localhost:3000/api/driver/approved-drivers"
      );
      const passengers = await axios.get(
        "http://localhost:3000/api/passenger/all-passengers"
      );
      setAllDrivers(drivers.data);
      setAllPassengers(passengers.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    getData();
  }, []);
  return (
    <approvedContext.Provider
      value={{
        allDrivers,
        allPassengers,
        setAllDrivers,
        setAllPassengers,
        refreshData:getData
      }}
    >
      {children}
    </approvedContext.Provider>
  );
};

export const useApprovedDrivers = ()=> useContext(approvedContext)