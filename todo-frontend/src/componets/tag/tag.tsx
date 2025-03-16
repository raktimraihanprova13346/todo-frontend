import "./tag.scss";
import React, {JSX, useState} from "react";

interface TagProps {
    id: number;
    content: string;
    onDelete: (id: number) => void;
}


const TagComponent: React.FC<TagProps> = (tagProps: TagProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(tagProps.content);

    const handleSave = () => {
        if (editedContent.trim() === "") return;
        // onEdit(id, editedContent);
        setIsEditing(false);
    };

    return (
        <div className="tag">
            {/* Tag Content */}
            {isEditing ? (
                <input
                    type="text"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    onBlur={handleSave} // Save on losing focus
                    onKeyDown={(e) => e.key === "Enter" && handleSave()} // Save on Enter press
                    className="tag-input"
                    autoFocus
                />
            ) : (
                <span
                    className="tag-content"
                    onClick={() => setIsEditing(true)} // Enable editing on click
                >
          {tagProps.content}
        </span>
            )}

            <button
                // onClick={() => onDelete(id)}
                className="delete-button"
                aria-label="Delete Tag"
            >
                &times; {/* Delete icon */}
            </button>
        </div>
    );
}

export default TagComponent;