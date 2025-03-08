import {API_URL} from "../config/app.config";
import axiosInstance from "../config/axios.setup";

export interface SignedInUser {
    username: string,
    email: string,
    updatedDate: Date,
    createdDate: Date,
    accessToken: string
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export default class SignInServices {
    static async login(credentials: LoginCredentials): Promise<SignedInUser> {
        try{
            const response = await axiosInstance.post(API_URL.singIn, credentials);
            return response.data;
        } catch(error: any){
            throw new Error(error.response?.data?.message || 'Login Failed');
        }

    }
};