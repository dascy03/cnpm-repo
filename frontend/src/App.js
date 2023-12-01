import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import PrintSPSO from "./SPSO-Func/printSPSO";
import ProfileSPSO from "./SPSO-Func/profileSPSO";
import UserMana from "./SPSO-Func/userManagement";
import QueueMana from "./SPSO-Func/queueManagement";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* General */}
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/homeUser" element={<HomeUser />} />
          <Route path="/History" element={<History />} />
          <Route path="/printUser" element={<PrintUser />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/buyPage" element={<BuyPage />} />
          {/* SPSO Func */}
          <Route path="/HomeSPSO" element={<HomeSPSO />} />
          <Route path="/printerManagement" element={<PrinterMana />} />
          <Route path="/printSPSO" element={<PrintSPSO />} />
          <Route path="/profileSPSO" element={<ProfileSPSO />} />
          <Route path="/userManagement" element={<UserMana />} />
          <Route path="/queueManagement" element={<QueueMana />} />
          <Route index element={<LogIn />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
