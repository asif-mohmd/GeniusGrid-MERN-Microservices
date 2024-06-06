import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { InstructorDataPayload } from "../../interfaces/ICommonInterface";

interface IInstructorData {
  instructorData: object | null;

}

const initialState: IInstructorData = {
  instructorData: null,
  

};

const instructorDataSlice = createSlice({
  name: "instructorData",
  initialState,
  reducers: {
    setInstructorData: (state, action: PayloadAction<IInstructorData>) => {
      state.instructorData = action.payload;
    },
    clearInstructorData: (state) => {
      state.instructorData = null;
    },
    // updatePicture: (state, action: PayloadAction<string>) => {
    //   state.userImg = action.payload;
    // }
  }
});

export const { setInstructorData, clearInstructorData } = instructorDataSlice.actions;

export default instructorDataSlice.reducer;



