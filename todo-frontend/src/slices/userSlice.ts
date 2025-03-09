import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import Cookie from "js-cookie";

interface User {
    username: string;
    emailAddress: string;
    updatedAt: Date;
    createdAt: Date;
    loggedIn: boolean;
    accessToken: string;
}

const initialState: User = {
    username: '',
    emailAddress: '',
    updatedAt: new Date(),
    createdAt: new Date(),
    loggedIn: false,
    accessToken: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state,
                action: PayloadAction<{
                    username: string,
                    email: string,
                    updatedDate: Date,
                    createdDate: Date,
                    accessToken: string}>) => {
            state.username = action.payload.username;
            state.emailAddress = action.payload.email;
            state.updatedAt = action.payload.updatedDate;
            state.createdAt = action.payload.createdDate;
            state.loggedIn = true;
            state.accessToken = action.payload.accessToken;

            Cookie.set('accessToken', action.payload.accessToken, {
                expires: 1,
            });
        },

        logout: (state) => {
            state.username = '';
            state.emailAddress = '';
            state.updatedAt = new Date();
            state.createdAt = new Date();
            state.loggedIn = false;
            state.accessToken = '';
        }
    }
});

export const {login, logout} = userSlice.actions;
export const userReducer =  userSlice.reducer;