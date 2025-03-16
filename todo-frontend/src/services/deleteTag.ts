import Cookies from "js-cookie";
import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";

export interface DeleteTagReq {
    email: string;
    id: number;
}

export interface DeleteTagRes {
    message: string;
}

export class DeleteTagServices {
    static async deleteTag(deleteTagReq: DeleteTagReq): Promise<DeleteTagRes> {
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.deleteTag, deleteTagReq,{
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