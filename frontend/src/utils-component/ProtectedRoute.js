import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
    return <Navigate to="/" replace />;
};

export default Protected;