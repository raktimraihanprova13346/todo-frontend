import {API_URL} from "../config/app.config";
import axiosInstance from "../config/axios.setup";

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
            const response = await axiosInstance.post(API_URL.addTag, tag);
            return response.data;
        }catch(error: any){
            throw new Error(error.response?.data?.message || 'Tag Could not be added.');
        }

    }
}