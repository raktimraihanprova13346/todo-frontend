import React from "react";
import "./todoList.scss";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slices/userSlice";
import {useDispatch} from "react-redux";

const TodoList: React.FC = ()=> {
    const userName = store.getState().user.username;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redirectToDoList = () => {
        navigate("/todo-list", { replace: true })
    }

    const logoutAction = () => {
        dispatch(logout());
        navigate("/", {replace: true});
    }

    return(
        <div className="todo-page"> {/* Parent container */}
            {/* Left Section: Menu */}
            <div className="left-menu">
                <h2>
                   Welcome: <br/>
                   {userName}
                </h2>
                <h2>Menu</h2>
                <ul>
                    <li onClick={redirectToDoList}>ToDo List</li>
                    <li>Tag</li>
                    <li onClick={logoutAction}>Logout</li>
                </ul>
            </div>

            {/* Right Section: To-Do List */}
            <div className="right-todo-list">
                <h2>To-Do List</h2>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                </ul>
            </div>
        </div>
    )

}

export default TodoList;