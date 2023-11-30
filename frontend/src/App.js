import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeUser from "./homeUser";
import History from "./History";
import "./css/App.css";
import HomeSPSO from "./homeSPSO";
import PrinterMana from "./printerManagement";
import PrintUser from "./printUser";
import ProfileUser from "./profileUser";
import PrintSPSO from "./printSPSO";
import ProfileSPSO from "./profileSPSO";
import Register from "./register";
import LogIn from "./logIn"
import ForgotPassword from "./forgotPassword"
import UserMana from "./UserManagement"
import BuyPage from "./buyPage"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/homeUser" element={<HomeUser />} />
          <Route path="/History" element={<History />} />
          <Route path="/printUser" element={<PrintUser />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/HomeSPSO" element={<HomeSPSO />} />
          <Route path="/printerManagement" element={<PrinterMana />} />
          <Route path="/printSPSO" element={<PrintSPSO />} />
          <Route path="/profileSPSO" element={<ProfileSPSO />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userManagement" element={<UserMana />} />
          <Route path="/buyPage" element={<BuyPage />} />
          <Route index element={<LogIn />} />
        </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
