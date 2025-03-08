import axios from "axios";
import {setLoading} from "../slices/loaderSlice";
import store from "../store";


const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("loader called")
        store.dispatch(setLoading(true))
        return config;
    },
    (error) => {
        store.dispatch(setLoading(false))
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(setLoading(false))
        return response;
    },
    (error) => {
        store.dispatch(setLoading(false))
        return Promise.reject(error);
    }
);

export default axiosInstance;