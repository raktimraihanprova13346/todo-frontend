import {API_URL} from "../config/app.config";
import axiosInstance from "../config/axios.setup";

export interface SignUpInterface {
    email: string;
    username: string;
    password: string;
}

export interface SignUpResponse {
    message: string;
    error: string;
    statusCode: number;
}

export default class SignUpServices {
    static async signUp(credentials: SignUpInterface): Promise<SignUpResponse> {
        try{
            const response = await axiosInstance.post(API_URL.singUp, credentials);
            return response.data;
        } catch(error: any){
            throw new Error(error.response?.data?.message || 'Sign Up Failed');
        }
    }
}