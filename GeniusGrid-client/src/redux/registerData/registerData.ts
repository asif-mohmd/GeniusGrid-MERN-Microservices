import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    formData: object | null;
 
}

const initialState: UserState = {
    formData: null,

};

const registerDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    setRegisterData: (state, action: PayloadAction<object>) => {
      state.formData = action.payload;
    },
    clearRegisterData: (state) => {
      state.formData = null;
    },

  }
});

export const { setRegisterData, clearRegisterData } = registerDataSlice.actions;

export default registerDataSlice.reducer;
