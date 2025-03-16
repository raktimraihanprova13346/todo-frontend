import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";
import Cookies from "js-cookie";

export interface TodoUpdateReq {
    id: number;
    title: string;
    content: string;
    status: 'Incomplete' | 'Complete';
    deadline?: Date;
    completedDate?: Date;
    emailAddress?: string;
    overdue?: boolean;
    tagID?: number[];
}

export interface TodoUpdateResp {
    message: string;
}
export default class UpdateTodoServices{
    static async updateTodo(todoUpdateReq: TodoUpdateReq): Promise<TodoUpdateResp>{
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.updateTodo, todoUpdateReq, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Todo Could not be updated.');
        }
    }
}