import "./todoAdd.scss";
import "react-datepicker/dist/react-datepicker.css";
import Menus from "../../componets/menus/menus";
import React, {useEffect, useState} from "react";
import {AddTodoServices, ToDoAddReq} from "../../services/addTodo";
import classNames from "classnames";
import DatePicker from "react-datepicker";
import CheckBoxList from "../../componets/checkBoxList/checkBoxList";
import {Tag, TagArray} from "../../dto/tag.dto";
import {GetTagList} from "../../services/getTagList";
import store from "../../store";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

interface TagListProps {
    id: number;
    label: string;
}

const TagList: React.FC = () => {
    const [tagFetchingError, setTagFetchingError] = useState<string>();
    const [tagListProps, setTagListProps] = useState<TagListProps[]>([]);
    const [selectedTagItems, setSelectedTagItems] = useState<number[]>([]);
    const emailAddress: string = store.getState().user.emailAddress;
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const [dateError, setDateError] = useState("");
    const navigate = useNavigate();


    const [formData, setFormData] = React.useState<ToDoAddReq>({
        title: "",
        content: "",
        deadline: new Date(),
        tagID: [],
        emailAddress: "",
    });

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response: TagArray = await GetTagList.getTagList(emailAddress);
                if(response.tags){
                    const filteredTags: TagListProps[] = response.tags.map(tag => ({
                        id: tag.id,
                        label: tag.tagName.slice(0, 1).toUpperCase() + tag.tagName.slice(1, 30)
                    }));
                    setTagListProps(filteredTags);
                }
            } catch (error: any) {
                setTagFetchingError("Tag Data could not be fetched. Please try again");
            }
        }
        fetchData();
    },[]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: [value]});
        if (value.length < 3) {
            setTitleError("Title must be at least 5 characters long");
        } else {
            setTitleError("");
        }
    }

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: [value]});
        if (value.length < 3) {
            setContentError("Content must be at least 20 characters long");
        } else {
            setContentError("");
        }
    }

    const handleSelectionChange = (id: number[]) => {
        setSelectedTagItems(id);
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData({...formData, deadline: date});
            setDateError("");
        }
        else{
            setDateError("Please select a date");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const createTodoData: ToDoAddReq = {
            title: formData.title,
            content: formData.content,
            deadline: formData.deadline,
            tagID: selectedTagItems,
            emailAddress: emailAddress,
        };

        try{
            const response = await AddTodoServices.addTodo(createTodoData);
            Swal.fire({
                title: 'To Do Item Added Successfully',
                text: 'You will be redirected to the Todo list page in a few seconds',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
            }).then( () => {
                navigate("/todo-list");
            });
        }catch (error: Error | any){
            const errorMessage = error?.message || "Todo could not be added. Please try again";
            Swal.fire({
                title: 'Sign up failed',
                text: errorMessage,
                icon: 'error',
                showConfirmButton: true,
            })
        }
    };


    return (

        <div className="todo-container">

            <div className= "todo-container-left">
                <Menus />
            </div>

            <div className="todo-container-right">
                <div className="add-todo">
                    <h4 className="add-todo-label">Add ToDo Item</h4>
                    <form onSubmit={handleSubmit} className="add-todo-form">

                        <label htmlFor="title" >Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleTitleChange}
                            required
                        />
                        {
                            titleError && (<p style={{color: "red"}}> {titleError} </p>)
                        }


                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleContentChange}
                            required
                        />
                        {
                            contentError && (<p style={{color: "red"}}> {contentError} </p>)
                        }

                        <label htmlFor="deadline" >Deadline:</label>
                         <DatePicker
                            selected={formData.deadline}
                            showTimeSelect
                            onChange={handleDateChange}
                            dateFormat="Pp"
                            className="datepicker"
                            minDate={new Date()}
                        />
                        {
                            dateError && (<p style={{color: "red"}}> {dateError} </p>)
                        }

                       <label htmlFor="tagID" className="add-todo-input">Tags (comma-separated):</label>
                       <CheckBoxList items={tagListProps} onSelectedChange={handleSelectionChange } selectedIdList={selectedTagItems} />
                        {
                            tagFetchingError && (<p style={{color: "red"}}> {tagFetchingError} </p>)
                        }

                        <button type="submit"
                                className={classNames("add-tag-button",
                                    {'disabled': titleError.length > 0 ||  contentError.length > 0 || !formData.deadline})}
                                disabled={titleError.length > 0 ||  contentError.length > 0 || !formData.deadline}>
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default TagList;