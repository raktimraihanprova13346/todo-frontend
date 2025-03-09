import {JSX} from "react";
import Cookie from "js-cookie";
import {Navigate} from "react-router-dom";

const ProtectedRoute: React.FC<{children: JSX.Element}> = ({children}) => {
    const token = Cookie.get("accessToken");

    if(!token){
        return <Navigate to="/" replace={true} />
    }

    return children;
}

export default ProtectedRoute;