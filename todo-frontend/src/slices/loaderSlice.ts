import {createSlice, Draft, PayloadAction, Slice} from "@reduxjs/toolkit";
import Loader from "../componets/loader/loader";

interface LoaderState {
    loading: boolean;
}

const initialState: LoaderState = {
    loading: false
}

const loaderSlice: Slice<LoaderState> = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoading: (state: Draft<LoaderState>, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        }
    }
});

export const {setLoading} = loaderSlice.actions;
export const LoaderReducer = loaderSlice.reducer;