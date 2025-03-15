import React from "react";
import "./todoList.scss";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slices/userSlice";
import {useDispatch} from "react-redux";
import Menus from "../../componets/menus/menus";
import TodoCard from "../../componets/todoCard/todoCard";

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
                <TodoCard
                    title="To-Do List"
                    content="This is the To-Do List"
                    deadline={new Date('2025-03-15T16:24:31.261Z')}
                    status="Complete"
                    updateDate={new Date('2025-03-15T16:24:31.261Z')}
                    completionDate={new Date('2025-03-15T16:24:31.261Z')}
                    tagID = {[76,73,72]}
                />



            </div>
        </div>
    )

}

export default TodoList;