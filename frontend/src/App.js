import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import "./App.css";
import { useEffect, useState } from "react";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;