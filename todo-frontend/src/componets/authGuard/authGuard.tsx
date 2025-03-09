import {Navigate} from "react-router-dom";
import React, {JSX} from "react";
import store from "../../store";
import Cookie from "js-cookie";

const UnAuthenticatedGuard: React.FC<{ children: JSX.Element}> = ({children}) => {
    const isLoggedIn = Cookie.get("accessToken");

    if(!!isLoggedIn){
        return <Navigate to="/todo-list" replace={true} />
    }

    return children || null;
}

export default UnAuthenticatedGuard;