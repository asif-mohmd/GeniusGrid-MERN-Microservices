import cookie from "js-cookie"
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
    userLogin: (state) => {
      state.isLogin = true;
    },
    userLogout: (state) => {
      state.isLogin = false;
    },
    checkUserAuthentication:(state)=>{
      const userData = cookie.get("userData")
      if(!userData){
      state.isLogin = false
      }
    
  }
}});

export const { userLogin, userLogout, checkUserAuthentication } = authSlice.actions;

export default authSlice.reducer;
