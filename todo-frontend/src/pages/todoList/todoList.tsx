import React, {ChangeEventHandler, useEffect, useState} from "react";
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
import TagList from "../tagList/tags";
import CheckBoxList, {CheckboxItem, CheckboxListProps} from "../../componets/checkBoxList/checkBoxList";
import {Tag, TagArray} from "../../dto/tag.dto";
import {GetTagList} from "../../services/getTagList";

const TodoList: React.FC = ()=> {
    const [currentPageNumber, setPageNumber] = useState(1);
    const [currentItemsPerPage, setItemsPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const emailAddress: string = store.getState().user.emailAddress;
    const [currentTagIds,setTagIds] = useState<number[]>([]);
    const [currentStatus,setStatus] = useState<'Complete' | 'Incomplete' | null>(null);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [checkBoxItem, setCheckBoxItem] = useState<CheckboxItem[]>([]);
    const [selectedTagIdSearch, setSelectedTagIdSearch] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: TagArray = await GetTagList.getTagList(emailAddress);
                if(response.tags){
                    const filteredTags: CheckboxItem[] = response.tags.map(tag => ({
                        id: tag.id,
                        label: tag.tagName.slice(0, 1).toUpperCase() + tag.tagName.slice(1, tag.tagName.length)
                    }));
                    setCheckBoxItem(filteredTags);
                }
            } catch (error: any) {
                Swal.fire({
                    title: 'List could not be fetched.',
                    text: 'Please Login again.',
                    icon: 'error',
                    showConfirmButton: true,
                })
            }
        }
        fetchData();
    },[]);

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
        } catch (error: any) {
            Swal.fire({
                title: 'List could not be fetched.',
                text: 'Please Login again.',
                icon: 'error',
                showConfirmButton: true,
            })
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [currentPageNumber, currentTagIds, currentStatus]);

    const handleOnDeleteTodo = async (e: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== e)
        setTodos(updatedTodos);
        if (currentPageNumber === 1) {
            await fetchTodos();
        }else{
            setPageNumber(1);
        }
    }

    const handleStatusChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        if(e.target.value === "All"){
            setPageNumber(1);
            setStatus(null);
        }

        else{
            setPageNumber(1);
            setStatus(e.target.value as 'Complete' | 'Incomplete');
        }
    }

    const handleTagSelectionSearch = async (ids: number[]) => {
        setPageNumber(1);
        setSelectedTagIdSearch(ids);
        setTagIds(ids);
        console.log(currentTagIds);
    }

    return(
        <div className="todo-page"> {/* Parent container */}
            {/* Left Section: Menu */}
            <div className="left-menu">
                <Menus />
            </div>

            {/* Right Section: To-Do List */}
            <div className="right-todo-list">

                <div className="search-container">
                    <h2>Search By Status: </h2>
                    <select
                        name="status" id="status"
                        onChange={handleStatusChange}>
                        <option value="All">All</option>
                        <option value="Complete">Complete</option>
                        <option value="Incomplete">Incomplete</option>
                    </select>
                    <h2>Filter By Tag: </h2>
                    <CheckBoxList items={checkBoxItem} selectedIdList={selectedTagIdSearch} onSelectedChange={handleTagSelectionSearch} />

                </div>

                <div className="pagination-container">
                    <h2>To-Do List</h2>
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
                        disabledClassName={"disabled"}
                        forcePage={currentPageNumber - 1}
                    />
                </div>
            </div>
        </div>
    )

}

export default TodoList;