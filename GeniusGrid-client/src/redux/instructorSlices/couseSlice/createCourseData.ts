import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICreateCourse1 } from "../../../interfaces/InstructorInterfaces/ICreateCourse";



interface InitialStateType {
    createCourse: ICreateCourse1 | null;
  }
  
  const initialState: InitialStateType = {
    createCourse: null,
  };
  
const createCourseData = createSlice({
    name: "courseData",
    initialState,
    reducers: {
        setCreateCourse:(state,action:PayloadAction<ICreateCourse1>) =>{
            state.createCourse = action.payload;
        },

        setCreateCourseEmpty:(state)=>{
            state.createCourse = null;
        },
     
    }
})

export const {setCreateCourse,setCreateCourseEmpty} = createCourseData.actions;

export default createCourseData.reducer;