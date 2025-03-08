import {createSlice} from "@reduxjs/toolkit";

interface LoaderState {
    loading: boolean;
}

const initialState: LoaderState = {
    loading: false
}

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const {setLoading} = loaderSlice.actions;
export const LoaderReducer = loaderSlice.reducer;