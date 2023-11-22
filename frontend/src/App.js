import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./homeUser";
import History from "./History";
import "./App.css";
import { useEffect, useState } from "react";
import HomeSPSO from "./homeSPSO";
import PrinterMana from "./printerManagement";
import PrintUser from "./printUser";
import ProfileUser from "./profileUser";
import PrintSPSO from "./printSPSO";
import ProfileSPSO from "./profileSPSO";
import LogIn from "./logIn";
import Register from "./register"
import ForgotPassword from "./forgotPassword"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/homeUser" element={<HomeUser />} />
          <Route path="/History" element={<History />} />
          <Route path="/HomeSPSO" element={<HomeSPSO />} />
          <Route path="/printerManagement" element={<PrinterMana />} />
          <Route path="/printUser" element={<PrintUser />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/printSPSO" element={<PrintSPSO />} />
          <Route path="/profileSPSO" element={<ProfileSPSO />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/logIn" element={<LogIn/>} />
          <Route index element={<LogIn/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
