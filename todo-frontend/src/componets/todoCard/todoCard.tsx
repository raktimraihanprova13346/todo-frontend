import React, {useEffect, useRef, useState} from "react";
import "./todoCard.scss";
import store from "../../store";
import {TagArray} from "../../dto/tag.dto";
import {GetTagList} from "../../services/getTagList";
import CheckBoxList from "../checkBoxList/checkBoxList";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import UpdateTodoServices, {TodoUpdateReq, TodoUpdateResp} from "../../services/updateTodo";
import Swal from "sweetalert2";
import {DeleteTodoReq, DeleteTodoServices} from "../../services/deleteTodo";

interface TagListProps {
    id: number;
    label: string;
}
interface TodoCardProps {
    id: number;
    title: string;
    content: string;
    deadline: Date;
    status: string;
    updateDate: Date;
    completionDate: Date;
    tagID: number[];
    onDeleted: (deleteId: number) => void;
}
const formatter = new Intl.DateTimeFormat("EN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: undefined,
});

const TodoCard: React.FC<TodoCardProps> = (todoCardProps: TodoCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isContentEditing, setIsContentEditing] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(todoCardProps.title);
    const [currentContent, setCurrentContent] = useState(todoCardProps.content);
    const [currentDeadline, setCurrentDeadline] = useState(new Date(todoCardProps.deadline));
    const [currentStatus, setCurrentStatus] = useState(todoCardProps.status);
    const [currentTagIds, setCurrentTagIds] = useState<number[]>(todoCardProps.tagID);
    const [tagListProps, setTagListProps] = useState<TagListProps[]>([]);
    const [tagFetchingError, setTagFetchingError] = useState<string>();
    const [isEditingDate, setIsEditingDate] = useState(false);
    const [isEditingTag, setIsEditingTag] = useState(false);
    const [currentCompletionDate, setCurrentCompletionDate] = useState<Date>(todoCardProps.completionDate);
    const [currentUpdateDate, setCurrentUpdateDate] = useState<Date>(todoCardProps.updateDate);
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const emailAddress: string = store.getState().user.emailAddress;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: TagArray = await GetTagList.getTagList(emailAddress);
                if(response.tags){
                    const filteredTags: TagListProps[] = response.tags.map(tag => ({
                        id: tag.id,
                        label: tag.tagName.slice(0, 1).toUpperCase() + tag.tagName.slice(1, tag.tagName.length)
                    }));
                    setTagListProps(filteredTags);
                }
            } catch (error: any) {
                setTagFetchingError("Tag Data could not be fetched. Please try again");
            }
        }
        fetchData();
    },[]);

    const updateData = async () => {
        const todoUpdateReq: TodoUpdateReq = {
            id: todoCardProps.id,
            title: currentTitle.trim(),
            content: currentContent.trim(),
            status: currentStatus === "Incomplete" ? "Incomplete" : "Complete",
            deadline: currentDeadline,
            completedDate: currentCompletionDate,
            emailAddress: emailAddress,
            overdue: currentDeadline < currentCompletionDate,
            tagID: currentTagIds,
        };

        try {
            const response: TodoUpdateResp = await UpdateTodoServices.updateTodo(todoUpdateReq);
            setCurrentUpdateDate(new Date());
        } catch (error) {
            Swal.fire({
                title: 'Data could not be updated.',
                text: 'Please try again later.',
                icon: 'error',
                showConfirmButton: true,
            })
        }
    }

    const handleOnTagSelection = (selectedIds: number[]) => {
        setCurrentTagIds(selectedIds);
    }

    const handleContentClick = () => {
        setIsContentEditing(true);
        setIsEditing(false);
        setIsEditingDate(false);
        setIsEditingTag(false);
    }

    const handleTitleClick = () => {
        setIsEditing(true);
        setIsContentEditing(false);
        setIsEditingDate(false);
        setIsEditingTag(false);
    };

    const handleDateOnClick = () => {
        setIsEditingDate(true);
        setIsEditing(false);
        setIsContentEditing(false);
        setIsEditingTag(false);
    }

    const handleTagClick = () => {
        setIsEditing(false);
        setIsContentEditing(false);
        setIsEditingDate(false);
        setIsEditingTag(true);
    };

    const handleStatusClick = () => {
        setIsEditing(false);
        setIsContentEditing(false);
        setIsEditingDate(false);
        setIsEditingTag(false);
    };

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    };

    const handleContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentContent(e.target.value);
    };

    const handleDateChange = async (date: Date | null) => {
        if (date) {
            setCurrentDeadline(date);
            await updateData();
        }
    }

    const handleBlur = async () => {
        await updateData();
        setIsEditing(false);
    };

    const handleTagSelectionBlur = async () => {
        if(timerId.current){
            clearTimeout(timerId.current);
        }
        timerId.current = setTimeout(
            async () => {
                setIsEditingTag(false);
                await updateData()
                timerId.current = null;
            },1000);
    }

    const handleDateBlur = async () => {
        await updateData();
        setIsEditingDate(false);
    }

    const handleContentBlur = async () => {
        await updateData();
        setIsContentEditing(false);
    };

    // Handle status change
    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value);
        if (e.target.value === 'Complete' || e.target.value === 'Incomplete') {
            setCurrentCompletionDate(new Date());
            await updateData();
        }
    };

    const handleDeleteTodo = async () => {
        const deleteTodoReq: DeleteTodoReq = {
            emailAddress: emailAddress,
            id: todoCardProps.id
        }
        try {
            const response = await DeleteTodoServices.deleteTodo(deleteTodoReq);
            todoCardProps.onDeleted(deleteTodoReq.id);
        } catch (error) {
            Swal.fire({
                title: 'Data could not be updated.',
                text: 'Please try again later.',
                icon: 'error',
                showConfirmButton: true,
            })
        }
    }

    return (
        <div className="todo-card">
            {/* Header with editable title */}
            <div className="todo-card-header">
                {isEditing ? (
                    <div>
                        <input
                            type="text"
                            value={currentTitle}
                            onChange={handleTitleInput}
                            onBlur={handleBlur}
                            className="todo-card-title--editing"
                        />
                    </div>
                ) : (
                    <span className="todo-card-title" onClick={handleTitleClick}>
                        {currentTitle}
                    </span>
                )}
            </div>

            {/* Content section */}
            <div className="todo-card-content">
                {isContentEditing ? (
                    <div>
                        <textarea
                            value={currentContent}
                            onChange={e =>  handleContentInput(e)}
                            onBlur={handleContentBlur}
                            className="todo-card-content--editing"
                            rows={6}
                            cols={50}
                        />
                    </div>
                ) : (
                    <span className="todo-card-content" onClick={handleContentClick}>
                        {currentContent}
                    </span>
                )}
            </div>

            {/* Footer section */}
            <div className="todo-card-footer">
                <div>
                    <div>
                            {isEditingDate ? (
                                <>
                                    <label htmlFor="deadline" >Deadline:</label>
                                    <DatePicker
                                        selected={currentDeadline as Date}
                                        showTimeSelect
                                        onChange={handleDateChange}
                                        dateFormat="Pp"
                                        className="datepicker"
                                        minDate={new Date()}
                                    />
                                </>
                            ) : (
                                <p onClick={handleDateOnClick}><span>Deadline: </span>{formatter.format(currentDeadline)}</p>
                            )}
                        <p><span>Updated: </span>{formatter.format(currentUpdateDate)}</p>
                    </div>
                    {todoCardProps.completionDate && (
                        <p>
                            <span>Completed: </span>
                            {`${formatter.format(currentCompletionDate)}`}
                        </p>
                    )}
                </div>
                {
                    isEditingTag ? (
                            <div onBlur={handleTagSelectionBlur}>
                                <CheckBoxList
                                    items={tagListProps}
                                    onSelectedChange={handleOnTagSelection}
                                    selectedIdList={currentTagIds}
                                />
                            </div>
                    ): (
                        <div onClick={handleTagClick} >
                            <p><span>Status: </span>{currentStatus}</p>
                            <p><span>Tags: </span>{ currentTagIds.map(
                                tagId =>
                                    tagListProps.filter(tagListProps => tagId === tagListProps.id).map(tag => tag.label).join(", ")
                            ).join(", ")}</p>
                        </div>
                    )
                }

                <div className="button-container">
                    <select
                        className="status-dropdown"
                        value={currentStatus}
                        onChange={handleStatusChange}
                    >
                        <option value="Incomplete">In Progress</option>
                        <option value="Complete">Completed</option>
                    </select>
                    <button
                        className="delete-todo-btn"
                        onClick={handleDeleteTodo}
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
};

export default TodoCard;