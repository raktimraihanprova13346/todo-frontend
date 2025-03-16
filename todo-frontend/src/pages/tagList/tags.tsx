import Menus from "../../componets/menus/menus";
import "./tags.scss";
import TagComponent from "../../componets/tag/tag";

const TagList = () => {
    const handleDelete = () => {

    }
    return (
        <div className="tags-container">
            <div className= "tags-container-left">
                <Menus />
            </div>

            <div className="tags-container-right">
                <TagComponent id={1} content="This is tag" onDelete={handleDelete} />

            </div>
        </div>
    );
}

export default TagList;