import './tagAdd.scss';
import React from "react";
import Menus from "../../componets/menus/menus";
import AddTagServices, {TagAddReq, TagResponse} from "../../services/addTag";
import {useDispatch} from "react-redux";
import store from "../../store";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
const TadAdd: React.FC = () => {
    const [tag, setTag] = React.useState("");
    const [error, setError] = React.useState("");
    const emailAddress: string = store.getState().user.emailAddress;
    const navigate = useNavigate();

    const handleAddTag = async (e: React.FormEvent) => {
        e.preventDefault();
        if (tag.trim()) {
            const tagData: TagAddReq = {
                tagName: tag,
                emailAddress: emailAddress
            };

            try {
                const response: TagResponse = await AddTagServices.addTag(tagData);
                Swal.fire({
                    title: 'Tag Added Successfully',
                    text: 'You will be redirected to the tags page in a few seconds',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                }).then(() => {
                    navigate("/tags");
                });
            } catch (error: Error | any) {
                const errorMessage = error?.message || "Tag could not be added. Please try again";
                Swal.fire({
                    title: 'Tag could not be added',
                    text: errorMessage,
                    icon: 'error',
                    showConfirmButton: true,
                });
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
        if (tag.length < 3){
            setError("Tag must be at least 3 characters long");
        }else{
            setError("");
        }

    }

    return (
        <div className="tags-container">

            <div className= "tags-container-left">
                <Menus />
            </div>

            <div className= "tags-container-right">
                <div className="add-tag">
                    <h4 className="add-tag-label">Add Tag</h4>
                    <form onSubmit={handleAddTag} className="add-tag-form">
                        <input
                            type="text"
                            value={tag}
                            onChange={handleInputChange}
                            placeholder="Enter a tag"
                            className="add-tag-input"
                        />
                        {
                            error && (<p style={{color: "red"}}> {error} </p>)
                        }
                        <button type="submit" className={classNames("add-tag-button", {'disabled': tag.length <3})}
                                disabled={tag.length < 3}>
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TadAdd;