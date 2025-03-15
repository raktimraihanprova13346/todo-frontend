import React, {useEffect, useState} from "react";
import "./todoCard.scss";
import store from "../../store";
import {TagArray} from "../../dto/tag.dto";
import {GetTagList} from "../../services/getTagList";
import CheckBoxList from "../checkBoxList/checkBoxList";

interface TagListProps {
    id: number;
    label: string;
}
interface TodoCardProps {
    title: string;
    content: string;
    deadline: Date;
    status: string;
    updateDate: Date;
    completionDate: Date;
    tagID: number[];
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
    const [currentDeadline, setCurrentDeadline] = useState(formatter.format(new Date(todoCardProps.deadline)));
    const [currentStatus, setCurrentStatus] = useState(todoCardProps.status);
    const [currentTagIds, setCurrentTagIds] = useState<number[]>(todoCardProps.tagID);
    const [tagListProps, setTagListProps] = useState<TagListProps[]>([]);
    const [tagFetchingError, setTagFetchingError] = useState<string>();

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

    const handleOnTagSelection = (selectedIds: number[]) => {
        setCurrentTagIds(selectedIds);
        console.log(selectedIds);
    }

    const handleContentClick = () => {
        setIsContentEditing(true);
        setIsEditing(false);
    }

    const handleTitleClick = () => {
        setIsEditing(true);
        setIsContentEditing(false);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentTitle(e.target.value);
    };

    const handleContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentContent(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        // Add logic to save title, e.g., API call
    };

    const handleContentBlur = () => {
        setIsContentEditing(false);
        // Add logic to save title, e.g., API call
    };

    // Handle status change
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value);
        // Add logic to update status, e.g., API call
    };

    return (
        <div className="todo-card">
            {/* Header with editable title */}
            <div className="todo-card-header">
                {isEditing ? (
                    <input
                        type="text"
                        value={currentTitle}
                        onChange={handleInput}
                        onBlur={handleBlur}
                        className="todo-card-title--editing"
                    />
                ) : (
                    <span className="todo-card-title" onClick={handleTitleClick}>
                        {currentTitle}
                    </span>
                )}
            </div>

            {/* Content section */}
            <div className="todo-card-content">
                {isContentEditing ? (
                    <textarea
                        value={currentContent}
                        onChange={e =>  handleContentInput(e)}
                        onBlur={handleContentBlur}
                        className="todo-card-content--editing"
                        rows={6}
                        cols={50}
                    />
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
                        <p><span>Deadline: </span>{currentDeadline}</p>
                        <p><span>Updated: </span>{formatter.format(todoCardProps.updateDate)}</p>
                    </div>

                    {todoCardProps.completionDate && (
                        <p>
                            <span>Completed: </span>
                            {`${formatter.format(todoCardProps.completionDate)}`}
                        </p>
                    )}
                </div>
                <CheckBoxList items={tagListProps} onSelectedChange={handleOnTagSelection} selectedIdList={currentTagIds}/>
                <select
                    className="status-dropdown"
                    value={currentStatus}
                    onChange={handleStatusChange}
                >
                    <option value="Incomplete">In Progress</option>
                    <option value="Complete">Completed</option>
                </select>
            </div>
        </div>
    );
};

export default TodoCard;