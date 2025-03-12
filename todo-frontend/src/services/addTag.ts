import {API_URL} from "../config/app.config";
import axiosInstance from "../config/axios.setup";
import Cookie from "js-cookie";
import Cookies from "js-cookie";

export interface Tag {
    tagName: string;
    emailAddress: string;
}

export interface TagResponse {
    message: string;
}

export default class AddTagServices {
    static async addTag(tag: Tag): Promise<TagResponse> {
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.addTag, tag,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Tag Could not be added.');
        }
    }
}