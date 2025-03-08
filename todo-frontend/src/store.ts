import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import {LoaderReducer} from "./slices/loaderSlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        loader: LoaderReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
