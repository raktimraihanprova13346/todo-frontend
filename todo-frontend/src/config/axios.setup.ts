import axios from "axios";
import {setLoading} from "../slices/loaderSlice";
import store from "../store";


const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        if(!store.getState().loader.loading){
            store.dispatch(setLoading(true))
        }
        return config;
    },
    (error) => {
        if(store.getState().loader.loading){
            store.dispatch(setLoading(false))
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if(store.getState().loader.loading){
            store.dispatch(setLoading(false))
        }
        return response;
    },
    (error) => {
        if(store.getState().loader.loading){
            store.dispatch(setLoading(false))
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;