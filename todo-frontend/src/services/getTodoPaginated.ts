import {Todo} from "../dto/todo.dto";
import Cookies from "js-cookie";
import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";

export interface PaginatedToDoResponse {
    todos: Todo[];
    hasNextPage: boolean;
    totalPage: number;
    page: number;
    total: number;
}

export interface PaginatedToDoRequest {
    pageNumber: number;
    itemsPerPage: number;
    emailAddress: string;
    tagID?: number[];
    status?: 'Incomplete' | 'Complete' | null;
}
export class GetTodoPaginated{

    static async getPaginatedTodoList (paginatedTodoReq: PaginatedToDoRequest): Promise<PaginatedToDoResponse> {
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.getTodo, paginatedTodoReq, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Todo list could not be fetched.');
        }
    }

}