import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFullCourseCourseData, IEditCourse } from "../../../interfaces/InstructorInterfaces/IEditCourse";



interface InitialStateType {
    EditCourseData: IEditCourse | null;
    FullCourseData : IFullCourseCourseData | null
    privateIdStore : string;
  }
  
  const initialState: InitialStateType = {
    EditCourseData: null,
    FullCourseData: null,
    privateIdStore: "",
  };
  
const editCourseData = createSlice({
    name: "courseData",
    initialState,
    reducers: {
    
        setEditCourseData: (state,action:PayloadAction<IEditCourse>) =>{
            state.EditCourseData = action.payload;
        },
     
        
        setFullCourseData:(state,action:PayloadAction<IFullCourseCourseData>) =>{
            state.FullCourseData = action.payload;
        },
       
        setEditCourseDataEmpty:(state)=>{
            state.EditCourseData = null;
            state.FullCourseData = null
        },

        setPrivateId:(state,action)=>{
            state.privateIdStore = action.payload
        },

    }
})

export const {setEditCourseData, setPrivateId,setFullCourseData,setEditCourseDataEmpty} = editCourseData.actions;

export default editCourseData.reducer;