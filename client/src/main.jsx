import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { DriversRequestProvider } from "./context/DriverRequest.jsx";
import { ApprovedContextProvider } from "./context/ApprovedContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DriversRequestProvider>
          <ApprovedContextProvider>
            <App />
          </ApprovedContextProvider>
        </DriversRequestProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
