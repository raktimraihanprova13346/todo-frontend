import Cookies from "js-cookie";
import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";

export interface UpdateTagReq{
    email: string;
    id: number;
    content: string;
}

export interface UpdateTagRes{
    message: string;
}

export class UpdateTagServices{
    static async updateTag(updateTagReq: UpdateTagReq): Promise<UpdateTagRes>{
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.updateTag, updateTagReq, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data;
        } catch (error: Error | any) {
            throw new Error(error.response?.data?.message || 'Todo Could not be updated.');
        }
    }
}