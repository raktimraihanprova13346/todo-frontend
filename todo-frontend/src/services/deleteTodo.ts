import Cookies from "js-cookie";
import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";

export interface DeleteTodoReq{
    id: number;
    emailAddress: string;
}

export interface DeleteTodoResp{
    message: string;
}

export class DeleteTodoServices{
    static async deleteTodo(deleteTodoReq: DeleteTodoReq): Promise<DeleteTodoResp>{
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.deleteTodo, deleteTodoReq,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Todo Could not be deleted.');
        }
    }
}