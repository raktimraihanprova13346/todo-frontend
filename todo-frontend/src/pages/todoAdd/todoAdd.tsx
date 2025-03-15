import "./todoAdd.scss";
import "react-datepicker/dist/react-datepicker.css";
import Menus from "../../componets/menus/menus";
import React, {useState} from "react";
import {ToDoAddReq} from "../../services/addTodo";
import classNames from "classnames";
import DatePicker from "react-datepicker";

const TagList: React.FC = () => {

    const [formData, setFormData] = React.useState<ToDoAddReq>({
        title: "",
        content: "",
        deadline: new Date(),
        tagID: [],
        emailAddress: "",
    });


    const handleDateChange = (date: Date | null) => {
        if (date) {
            setFormData((prev) => ({
                ...prev,
                deadline: date,
            }));
        }
    };

    // Submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "tagID" ? value.split(",").map(Number) : value,
        }));
    }

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
                            onChange={handleInputChange}
                            required
                        />


                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                        />

                        <label htmlFor="deadline" >Deadline:</label>
                         <DatePicker
                            selected={formData.deadline}
                            showTimeSelect
                            onChange={handleDateChange}
                            dateFormat="Pp"
                            className="datepicker"
                            minDate={new Date()}
                        />

                       <label htmlFor="tagID" className="add-todo-input">Tags (comma-separated):</label>
                       <input
                           type="text"
                           id="tagID"
                           name="tagID"
                           value={formData.tagID.join(",")} // Convert array into comma-separated string
                           onChange={handleInputChange}
                           required
                       />

                        <button type="submit"
                                className={classNames("add-tag-button",
                                    {'disabled': formData.title.length <3 ||  formData.content.length <3 || !formData.deadline})}
                                disabled={formData.title.length <3 ||  formData.content.length <3 || !formData.deadline}>
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default TagList;