import {Tag} from "../dto/tag.dto";
import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";
import Cookies from "js-cookie";


export interface PaginatedTagListReq {
    pageNumber: number;
    itemsPerPage: number;
    emailAddress: string;
}

export interface PaginatedTagListResp {
    tags: Tag[];
    hasNextPage: boolean;
    page: number;
    totalPages: number;
}

export class GetPaginatedTagList{
    static async getPaginatedTagList(paginatedTagListReq: PaginatedTagListReq): Promise<PaginatedTagListResp> {
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.getTags, paginatedTagListReq, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Tag list could not be fetched.');
        }
    }
}