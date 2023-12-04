import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./GeneralUser-SPSO/homeUser";
import History from "./GeneralUser-SPSO/History";
import PrintUser from "./GeneralUser-SPSO/printUser";
import ProfileUser from "./GeneralUser-SPSO/profileUser";
import Register from "./GeneralUser-SPSO/register";
import LogIn from "./GeneralUser-SPSO/logIn";
import ForgotPassword from "./GeneralUser-SPSO/forgotPassword";
import BuyPage from "./GeneralUser-SPSO/buyPage";
import PageBuyHistory from "./GeneralUser-SPSO/pageBuyHistory";
import SettingUser from "./GeneralUser-SPSO/settingUser";

import "./css/App.css";
import HomeSPSO from "./SPSO-Func/homeSPSO";
import PrinterMana from "./SPSO-Func/printerManagement";
import QueuePrinter from "./SPSO-Func/queuePrinter";
import UserMana from "./SPSO-Func/userManagement";
import QueueMana from "./SPSO-Func/queueManagement";
import InsertPrinter from "./SPSO-Func/insertPrinter";
import GenaralSetting from "./SPSO-Func/genaralSetting";
import Dashboard from "./Dashboard/Dashboard";
import Protected from "./utils-component/ProtectedRoute";

function App() {
  const isLoggedIn = false;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<LogIn />} />
          {/* General */}
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />

          <Route
            path="/homeUser"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <HomeUser />
              </Protected>
            }
          />
          <Route
            path="/History"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <History />
              </Protected>
            }
          />
          <Route
            path="/pageBuyHistory"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <PageBuyHistory />
              </Protected>
            }
          />
          <Route
            path="/printUser"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <PrintUser />
              </Protected>
            }
          />
          <Route
            path="/profileUser"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <ProfileUser />
              </Protected>
            }
          />
          <Route
            path="/buyPage"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <BuyPage />
              </Protected>
            }
          />
          <Route
            path="/settingUser"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={false}>
                <SettingUser />
              </Protected>
            }
          />

          {/* SPSO Func */}
          <Route
            path="/HomeSPSO"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <HomeSPSO />
              </Protected>
            }
          />
          <Route
            path="/printerManagement"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <PrinterMana />
              </Protected>
            }
          />
          <Route
            path="/queuePrinter"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <QueuePrinter />
              </Protected>
            }
          />
          <Route
            path="/userManagement"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <UserMana />
              </Protected>
            }
          />
          <Route
            path="/queueManagement"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <QueueMana />
              </Protected>
            }
          />
          <Route
            path="/insertPrinter"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <InsertPrinter />
              </Protected>
            }
          />
          <Route
            path="/genaralSetting"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <GenaralSetting />
              </Protected>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Protected isLoggedIn={isLoggedIn} isSPSO={true}>
                <Dashboard />
              </Protected>
            }
          />
          {/* handle error */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
