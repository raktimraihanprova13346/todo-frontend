import Menus from "../../componets/menus/menus";
import "./tags.scss";
import TagComponent from "../../componets/tag/tag";
import {GetPaginatedTagList, PaginatedTagListReq, PaginatedTagListResp} from "../../services/getPaginatedTagList";
import store from "../../store";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import {DeleteTagServices} from "../../services/deleteTag";
import {Tag} from "../../dto/tag.dto";

const TagList = () => {
    const emailAddress: string = store.getState().user.emailAddress;
    const [itemPerPage, setItemPerPage] = useState(15);
    const [pageNumber, setPageNumber] = useState(1);
    const [paginatedTags, setPaginatedTags] = useState<PaginatedTagListResp>();
    const [totalPages, setTotalPages] = useState<number>(1);
    const [tag, setTag] = useState<Tag[]>([]);

    const fetchTag= async () => {
        const paginatedTagReq: PaginatedTagListReq = {
            pageNumber: pageNumber,
            itemsPerPage: itemPerPage,
            emailAddress: emailAddress
        };
        try {
            const resp: PaginatedTagListResp = await GetPaginatedTagList.getPaginatedTagList(paginatedTagReq);
            setPaginatedTags(resp);
            setTotalPages(resp.totalPages);
            setPageNumber(resp.page);
            setTag(resp.tags);
            console.log(resp);
            console.log(tag);
        } catch (error: Error | any) {
            Swal.fire({
                title: 'List could not be fetched.',
                text: 'Please Login again.',
                icon: 'error',
                showConfirmButton: true,
            })
        }
    };

    useEffect(()=> {
        fetchTag();
    },[pageNumber])

    const handleDelete = async (id: number) => {
        console.log("Returned ID: "+ id);
        if (paginatedTags && paginatedTags.tags) {
            const deletedTagReq = {
                id: id,
                email: emailAddress
            }
            try{
                const resp = await DeleteTagServices.deleteTag(deletedTagReq);
                setTag([]);
                if (pageNumber === 1) {
                    fetchTag();
                } else {
                    setPageNumber(1);
                }
            }catch (error: Error | any){
                Swal.fire({
                    title: 'List could not be deleted.',
                    text: 'Please try again.',
                    icon: 'error',
                    showConfirmButton: true,
                })
            }
        }
    }
    return (
        <div className="tags-container">
            <div className= "tags-container-left">
                <Menus />
            </div>

            <div className="tags-container-right">
                <div className="pagination-container">
                    <h4 className="tags-label">Tags</h4>
                    {
                        tag && tag.map(t => (
                            <TagComponent id={t.id} content={t.tagName} onDelete={handleDelete} />
                        ))
                    }

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
                        forcePage={pageNumber - 1}
                    />
                </div>


            </div>
        </div>
    );
}

export default TagList;