import "./menus.scss";
import React from "react";
import store from "../../store";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slices/userSlice";

const Menus = () => {
    const userName = store.getState().user.username;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const redirectToDoList = () => {
        navigate("/todo-list", { replace: true })
    }
    const redirectToTags = () => {
        navigate("/tags");
    }
    const logoutAction = () => {
        dispatch(logout(false));
        navigate("/", {replace: true});
    }

    function redirectToAddTag() {
        navigate("/add-tag");
    }

    return (
      <div className="menu">
          <h2>
              Welcome: <br/>
              {userName}
          </h2>
          <ul>
              <li>
                  <h3 onClick={redirectToDoList}> ToDo List </h3>
                  <ul>
                      <li> Add Todo </li>
                  </ul>
              </li>
              <li>
                  <h3 onClick={redirectToTags}>Tag</h3>
                  <ul>
                      <li onClick={redirectToAddTag}> Add Tag </li>
                  </ul>
              </li>
              <li onClick={logoutAction}>Logout</li>
          </ul>
      </div>
  )
};

export default Menus;