import {Navigate} from "react-router-dom";
import React, {JSX} from "react";
import store from "../../store";


const UnAuthenticatedGuard: React.FC<{ children: JSX.Element}> = ({children}) => {
    const isLoggedIn = store.getState().user.loggedIn;

    if(isLoggedIn){
        return <Navigate to="/todo-list" replace={true} />
    }

    return children || null;
}

export default UnAuthenticatedGuard;