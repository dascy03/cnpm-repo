import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
    console.log(sessionStorage.getItem("success"));
    if (isLoggedIn) {
        return children;
    }
    return <Navigate to="/" />;
};

export default Protected;