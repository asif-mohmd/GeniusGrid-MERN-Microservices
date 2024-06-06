import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userId: string | null;
  loading: boolean | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | null;
  userImg: string;
  purchasedCourseId : string | number
}

const initialState: UserState = {
  userId: null,
  loading: null,
  error: null,
  userImg: "",
  purchasedCourseId : ""
};

const userDetails = createSlice({
  name: "userData",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearUserData: (state) => {
      state.userId = null;
    },
    updatePicture: (state, action: PayloadAction<string>) => {
      state.userImg = action.payload;
    },
    setPurchasedCourseId :  (state, action: PayloadAction<string>) => {
      state.purchasedCourseId = action.payload;
    },
  }
}); 

export const { setUserId, clearUserData, updatePicture , setPurchasedCourseId} = userDetails.actions;

export default userDetails.reducer;
