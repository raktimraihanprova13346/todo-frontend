import React from "react";
import "./todoList.scss";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slices/userSlice";
import {useDispatch} from "react-redux";
import Menus from "../../componets/menus/menus";
import TodoCard from "../../componets/todoCard/todoCard";
import ReactPaginate from "react-paginate";

const TodoList: React.FC = ()=> {
    const userName = store.getState().user.username;
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleOnDeleteTodo = (e: number) => {
        console.log(e);
    }


    return(
        <div className="todo-page"> {/* Parent container */}
            {/* Left Section: Menu */}
            <div className="left-menu">
                <Menus />
            </div>

            {/* Right Section: To-Do List */}
            <div className="right-todo-list">

                <div className="pagination-container">
                    <h1>React Pagination Example</h1>
                    <ul>
                        hghu
                    </ul>
                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        onPageChange={(r) => {
                            console.log(r);
                        } }
                        pageCount={12}
                        marginPagesDisplayed={2} // Number of pages on each side of "..."
                        pageRangeDisplayed={3} // Number of continuous pages to display in the middle
                        containerClassName={"pagination"} // Container CSS class
                        activeClassName={"active"} // Active page CSS class
                        nextClassName={"next-page"} // Next button class
                        previousClassName={"prev-page"} // Previous button class
                        disabledClassName={"disabled"} // Disabled button class
                    />
                </div>






                <TodoCard
                    id={1}
                    title="To-Do List"
                    content="This is the To-Do List"
                    deadline={new Date('2025-03-15T16:24:31.261Z')}
                    status="Complete"
                    updateDate={new Date('2025-03-15T16:24:31.261Z')}
                    completionDate={new Date('2025-03-15T16:24:31.261Z')}
                    tagID = {[76,73,72]}
                    onDeleted={handleOnDeleteTodo}
                />



            </div>
        </div>
    )

}

export default TodoList;