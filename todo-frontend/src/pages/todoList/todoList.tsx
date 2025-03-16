import React, {useEffect, useState} from "react";
import "./todoList.scss";
import store from "../../store";
import {useNavigate} from "react-router-dom";
import {logout} from "../../slices/userSlice";
import {useDispatch} from "react-redux";
import Menus from "../../componets/menus/menus";
import TodoCard from "../../componets/todoCard/todoCard";
import ReactPaginate from "react-paginate";
import {GetTodoPaginated, PaginatedToDoRequest, PaginatedToDoResponse} from "../../services/getTodoPaginated";
import {Todo} from "../../dto/todo.dto";
import Swal from "sweetalert2";

const TodoList: React.FC = ()=> {
    const [currentPageNumber, setPageNumber] = useState(1);
    const [currentItemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const emailAddress: string = store.getState().user.emailAddress;
    const [currentTagIds,setTagIds] = useState<number[]>([]);
    const [currentStatus,setStatus] = useState<'Complete' | 'Incomplete' | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const paginatedTodoReq: PaginatedToDoRequest = {
                pageNumber: currentPageNumber,
                itemsPerPage: currentItemsPerPage,
                emailAddress: emailAddress,
                tagID: currentTagIds,
                status: currentStatus
            }

            try {
                const response = await GetTodoPaginated.getPaginatedTodoList(paginatedTodoReq);
                if(response){
                    setTodos(response.todos);
                    setPageNumber(response.page);
                    setTotalPages(response.totalPage);
                }
                console.log(response);
            } catch (error: any) {
                Swal.fire({
                    title: 'List could not be fetched.',
                    text: 'Please Login again.',
                    icon: 'error',
                    showConfirmButton: true,
                })
            }
        };
        fetchTodos();

    }, [currentPageNumber, todos])

    const handleOnDeleteTodo = (e: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== e)
        setTodos(updatedTodos);
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


                    <div>
                        {todos.map((todo:Todo) => (
                                <TodoCard
                                    key={todo.id}
                                    id={todo.id}
                                    title= {todo.title}
                                    content={todo.content}
                                    deadline={new Date(todo.deadline)}
                                    status= {todo.status}
                                    updateDate={new Date(todo.updateDate)}
                                    completionDate={new Date(todo.creationDate)}
                                    tagID = {todo.tags.map(tag => tag.id)}
                                    onDeleted={handleOnDeleteTodo}
                                />
                            )
                        )}
                    </div>


                    <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        breakLabel={"..."}
                        onPageChange={(r) => {
                            setPageNumber(r.selected + 1);
                        } }
                        pageCount={totalPages}
                        marginPagesDisplayed={2} // Number of pages on each side of "..."
                        pageRangeDisplayed={3} // Number of continuous pages to display in the middle
                        containerClassName={"pagination"} // Container CSS class
                        activeClassName={"active"} // Active page CSS class
                        nextClassName={"next-page"} // Next button class
                        previousClassName={"prev-page"} // Previous button class
                        disabledClassName={"disabled"} // Disabled button class
                    />
                </div>
            </div>
        </div>
    )

}

export default TodoList;