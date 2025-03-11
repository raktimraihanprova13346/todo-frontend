import React from "react";
import "./todoList.scss";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slices/userSlice";
import {useDispatch} from "react-redux";
import Menus from "../../componets/menus/menus";

const TodoList: React.FC = ()=> {
    const userName = store.getState().user.username;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    return(
        <div className="todo-page"> {/* Parent container */}
            {/* Left Section: Menu */}
            <div className="left-menu">
                <Menus />
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