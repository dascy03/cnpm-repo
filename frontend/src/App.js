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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;