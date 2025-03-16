import {createSlice, Draft, PayloadAction, Slice} from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import {User} from "../dto/user.dto";

const initialState: User = {
    username: '',
    emailAddress: '',
    updatedAt: new Date(),
    createdAt: new Date(),
    loggedIn: false,
    accessToken: ''
}

const userSlice: Slice<User> = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: Draft<User>,
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

        logout: (state: Draft<User>, action: PayloadAction<boolean>) => {
            Cookie.remove('accessToken');
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