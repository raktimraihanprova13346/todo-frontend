import axiosInstance from "../config/axios.setup";
import {API_URL} from "../config/app.config";
import Cookies from "js-cookie";
import {TagArray} from "../dto/tag.dto";

export class GetTagList {
    static async getTagList(email: string): Promise<TagArray> {
        try{
            const token = Cookies.get("accessToken");
            const response = await axiosInstance.post(API_URL.getAllTagList, {email: email},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return {
                tags: response.data,
            };
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Todo Could not be added.');
        }
    }
}