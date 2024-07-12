import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
    name:"Skills",
    initialState:{
        loading: false,
        error: null,
        message: null,
        skills: []
    },
    reducers:{
        getAllSkillRequest(state,action){
            state.loading = true;
            state.error = null;
            state.skills = [];
        },
        getAllSkillSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.skills = action.payload;
        },
        getAllSkillFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.skills = state.skills;
        },
        addNewSkillRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewSkillSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewSkillFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteSkillRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteSkillSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteSkillFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        updateSkillRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateSkillSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        updateSkillFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetSkillSlice(state,action){
            state.loading = false;
            state.error = null;
            state.message = null;
            state.skills = state.skills;
        },
        clearAllErrors(state,action){
            state.error = null;
        }
    }
});

export const addNewSkill = (data) => async (dispatch) =>{
    dispatch(skillSlice.actions.addNewSkillRequest());
    try {
        const response = await axios.post("http://localhost:5000/api/v1/skill/add",
            data,
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        console.log(error.response.data);
        dispatch(skillSlice.actions.addNewSkillFail(error.response.data.message));
    }
}

export const updateSkill = (id,data) => async (dispatch) =>{
    dispatch(skillSlice.actions.updateSkillRequest());
    try {
        const response = await axios.put(`http://localhost:5000/api/v1/skill/update/${id}`,
            {"proficiency": data},
            {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            }
        );
        dispatch(skillSlice.actions.updateSkillSuccess(response.data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        console.log(error.response.data);
        dispatch(skillSlice.actions.updateSkillFail(error.response.data.message));
    }
}

export const getAllSkills = () => async (dispatch) =>{
    dispatch(skillSlice.actions.getAllSkillRequest());
    try {
        const {data} = await axios.get("http://localhost:5000/api/v1/skill/getall",
            {withCredentials: true}
        );
        dispatch(skillSlice.actions.getAllSkillSuccess(data.allSkills));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.getAllSkillFail(error.response.data.message));
    }
}

export const deleteSkill = (id) => async (dispatch) =>{
    dispatch(skillSlice.actions.deleteSkillRequest());
    try {
        const {data} = await axios.delete(`http://localhost:5000/api/v1/skill/delete/${id}`,
            {withCredentials: true}
        );
        dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
        dispatch(skillSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(skillSlice.actions.deleteSkillSliceFail(error.response.data.message));
    }
}

export const clearAllSkillErrors = () => (dispatch) =>{
    dispatch(skillSlice.actions.clearAllErrors());
}

export const resetSkillSlice = () => (dispatch) =>{
    dispatch(skillSlice.actions.resetSkillSlice());
}

export default skillSlice.reducer;