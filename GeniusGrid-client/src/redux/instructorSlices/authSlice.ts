import { createSlice } from "@reduxjs/toolkit";


interface AuthState {
    isLogin: boolean;
}

const initialState: AuthState = {
    isLogin: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        instructorLogin:(state) =>{
            state.isLogin = true;
        },
        instructorLogout: (state) =>{
            state.isLogin = false;
        }
    }
})

export const {instructorLogin, instructorLogout} = authSlice.actions;

export default authSlice.reducer;