import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./homeUser";
import History from "./History";
import "./App.css";
import { useEffect, useState } from "react";
import HomeSPSO from "./homeSPSO";
import PrinterMana from "./printerManagement";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/homeUser" element={<HomeUser />} />
          <Route path="/History" element={<History />} />
          <Route path="/HomeSPSO" element={<HomeSPSO />} />
          <Route path="/printerManagement" element={<PrinterMana />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;