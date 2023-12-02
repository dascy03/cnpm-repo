import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Protected = ({ isLoggedIn, isSPSO, children }) => {
    const cookies = new Cookies();
    if (cookies.get("isLogged") === true) isLoggedIn = true;
    if (isLoggedIn) {
        if (isSPSO === false){
            return children;
        }
        else if (isSPSO === true && cookies.get("isSPSO") === true) {
            return children;
        }
    }
    return <Navigate to="/" />;
};

export default Protected;