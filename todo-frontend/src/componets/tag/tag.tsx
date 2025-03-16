import "./tag.scss";
import React, {JSX, useState} from "react";
import Swal from "sweetalert2";
import UpdateTodoServices from "../../services/updateTodo";
import {UpdateTagReq, UpdateTagServices} from "../../services/updateTag";
import store from "../../store";

interface TagProps {
    id: number;
    content: string;
    onDelete: (id: number) => void;
}


const TagComponent: React.FC<TagProps> = (tagProps: TagProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(tagProps.content);
    const emailAddress: string = store.getState().user.emailAddress;
    const [savingError, setSavingError] = useState<string>("");

    const handleSave = async () => {
        if (editedContent.trim().length < 3) {
            setSavingError("Tag must be at least 3 characters long");
            setEditedContent(tagProps.content);
        } else {
            setSavingError("");
            const updateTagReq: UpdateTagReq = {
                email: emailAddress,
                id: tagProps.id,
                content: editedContent,
            }
            try{
                const resp = await UpdateTagServices.updateTag(updateTagReq);
            }catch (e) {
                Swal.fire({
                    title: 'Tag could not be updated',
                    text: 'Please try again after logging out and logging back in',
                    icon: 'error',
                    showConfirmButton: true,
                })
            }

        }

        setIsEditing(false);
    };

    return (
        <>
            <div className="tag">
                {/* Tag Content */}
                {isEditing ? (
                    <input
                        type="text"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        onBlur={handleSave} // Save on losing focus
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        className="tag-input"
                        autoFocus
                    />
                ) : (
                    <span
                        className="tag-content"
                        onClick={() => setIsEditing(true)} >{editedContent}
                </span>
                )}
                <button
                    onClick={() => tagProps.onDelete(tagProps.id)}
                    className="delete-button"
                    aria-label="Delete Tag"
                >
                    &times;
                </button>
            </div>
                {
                    savingError && (<p style={{color: "red"}}> {savingError} </p>)
                }
        </>


);
}

export default TagComponent;