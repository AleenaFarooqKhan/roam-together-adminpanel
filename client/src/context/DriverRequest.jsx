import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DriversRequestContext = createContext();

export const DriversRequestProvider =  ({ children }) => {
  const [requests, setRequests] = useState([]);
  const getRequests = async ()=>{
    try {
        const response = await axios.get("http://localhost:3000/api/driver/pending-drivers")
        setRequests(response.data.pendingDrivers)
    } catch (error) {
        console.log(error)
    }
}
  useEffect(() => {
    getRequests()
  }, []);
  return (
    <DriversRequestContext.Provider value={{requests,setRequests,refreshRequests: getRequests}}>{children}</DriversRequestContext.Provider>
  );
};
export const useRequests = ()=> useContext(DriversRequestContext)