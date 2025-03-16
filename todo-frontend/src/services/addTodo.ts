import Cookies from "js-cookie";
import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";

export interface ToDoAddReq {
    title: string;
    content: string;
    deadline: Date;
    tagID: number[];
    emailAddress: string;
}

export interface TodoAddResp {
    message: string;
}

export class AddTodoServices{
    static async addTodo(todo: ToDoAddReq){
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.addTodo, todo,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Todo Could not be added.');
        }
    }
}