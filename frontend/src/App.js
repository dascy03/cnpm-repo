import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react"; 
import HomeUser from "./GeneralUser-SPSO/homeUser";
import History from "./GeneralUser-SPSO/History";
import PrintUser from "./GeneralUser-SPSO/printUser";
import ProfileUser from "./GeneralUser-SPSO/profileUser";
import Register from "./GeneralUser-SPSO/register";
import LogIn from "./GeneralUser-SPSO/logIn"
import ForgotPassword from "./GeneralUser-SPSO/forgotPassword"
import BuyPage from "./GeneralUser-SPSO/buyPage"

import "./css/App.css";
import HomeSPSO from "./SPSO-Func/homeSPSO";
import PrinterMana from "./SPSO-Func/printerManagement";
import UserMana from "./SPSO-Func/userManagement";
import QueueMana from "./SPSO-Func/queueManagement";
import InsertPrinter from "./SPSO-Func/insertPrinter";

import Protected from "./utils-component/ProtectedRoute";
import { useEffect } from "react";
import Cookie from "universal-cookie";


function App() {
  const cookie = new Cookie();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie.get("isLogged")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          {/* General */}
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route path="/homeUser" element={
            <Protected isLoggedIn={isLoggedIn}>
              <HomeUser />
            </Protected>
          } />
          <Route path="/History" element={<History />} />
          <Route path="/printUser" element={<PrintUser />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/buyPage" element={<BuyPage />} />
          {/* SPSO Func */}
          <Route path="/HomeSPSO" element={<HomeSPSO />} />
          <Route path="/printerManagement" element={<PrinterMana />} />
          <Route path="/userManagement" element={<UserMana />} />
          <Route path="/queueManagement" element={<QueueMana />} />
          <Route path="/insertPrinter" element={<InsertPrinter />} />
          {/* handle error */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
