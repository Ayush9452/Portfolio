import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
    name:"projects",
    initialState:{
        loading: false,
        error: null,
        message: null,
        projects: []
    },
    reducers:{
        getAllProjectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.projects = [];
        },
        getAllProjectSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.projects = action.payload;
        },
        getAllProjectFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.projects = state.projects;
        },
        getSingleProjectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.projects = [];
        },
        getSingleProjectSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.projects = action.payload;
        },
        getSingleProjectFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.projects = state.projects;
        },
        addNewProjectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewProjectSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewProjectFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteProjectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteProjectSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteProjectFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        updateProjectRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        updateProjectSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        updateProjectFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetProjectSlice(state,action){
            state.loading = false;
            state.error = null;
            state.message = null;
            state.projects = state.projects;
        },
        clearAllErrors(state,action){
            state.error = null;
        }
    }
});

export const addNewProject = (data) => async (dispatch) =>{
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const response = await axios.post("http://localhost:5000/api/v1/project/add",
            data,
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        console.log(error.response.data);
        dispatch(projectSlice.actions.addNewProjectFail(error.response.data.message));
    }
}

export const updateProject = (id,data,) => async (dispatch) =>{
    console.log(id)
    dispatch(projectSlice.actions.addNewProjectRequest());
    try {
        const response = await axios.put(`http://localhost:5000/api/v1/project/update/${id}`,
            data,
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        dispatch(projectSlice.actions.addNewProjectSuccess(response.data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        console.log(error.response.data);
        dispatch(projectSlice.actions.addNewProjectFail(error.response.data.message));
    }
}

export const getAllProjects = () => async (dispatch) =>{
    dispatch(projectSlice.actions.getAllProjectRequest());
    try {
        const {data} = await axios.get("http://localhost:5000/api/v1/project/getall",
            {withCredentials: true}
        );
        dispatch(projectSlice.actions.getAllProjectSuccess(data.allProject));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.getAllProjectFail(error.response.data.message));
    }
}

export const deleteProject = (id) => async (dispatch) =>{
    dispatch(projectSlice.actions.deleteProjectRequest());
    try {
        const {data} = await axios.delete(`http://localhost:5000/api/v1/project/delete/${id}`,
            {withCredentials: true}
        );
        dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
        dispatch(projectSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(projectSlice.actions.deleteProjectSliceFail(error.response.data.message));
    }
}

export const clearAllProjectErrors = () => (dispatch) =>{
    dispatch(projectSlice.actions.clearAllErrors());
}

export const resetProjectSlice = () => (dispatch) =>{
    dispatch(projectSlice.actions.resetProjectSlice());
}

export default projectSlice.reducer;