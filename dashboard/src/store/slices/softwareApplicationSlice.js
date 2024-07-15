import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
    name:"softwareApplications",
    initialState:{
        loading: false,
        error: null,
        message: null,
        softwareApplications: []
    },
    reducers:{
        getAllsoftwareApplicationRequest(state,action){
            state.loading = true;
            state.error = null;
            state.softwareApplications = [];
        },
        getAllsoftwareApplicationSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.softwareApplications = action.payload;
        },
        getAllsoftwareApplicationFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.softwareApplications = state.Application;
        },
        addNewsoftwareApplicationRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewsoftwareApplicationSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewsoftwareApplicationFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deletesoftwareApplicationRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deletesoftwareApplicationSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deletesoftwareApplicationFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetsoftwareApplicationSlice(state,action){
            state.loading = false;
            state.error = null;
            state.message = null;
            state.softwareApplications = state.softwareApplications;
        },
        clearAllErrors(state,action){
            state.error = null;
        }
    }
});


export const addNewSoftwareApplication = (data) => async (dispatch) =>{
    dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationRequest());
    try {
        const response = await axios.post("https://portfolio-backend-e7yq.onrender.com/api/v1/application/add",
            data,
            {
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"}
            }
        );
        dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationSuccess(response.data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        console.log(error.response.data);
        dispatch(softwareApplicationSlice.actions.addNewsoftwareApplicationFail(error.response.data.message));
    }
}

export const getAllSoftwareApplications = () => async (dispatch) =>{
    dispatch(softwareApplicationSlice.actions.getAllsoftwareApplicationRequest());
    try {
        const {data} = await axios.get("https://portfolio-backend-e7yq.onrender.com/api/v1/application/getall",
            {withCredentials: true}
        );
        dispatch(softwareApplicationSlice.actions.getAllsoftwareApplicationSuccess(data.AllApplication));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.getAllsoftwareApplicationFail(error.response.data.message));
    }
}

export const deleteSoftwareApplication = (id) => async (dispatch) =>{
    dispatch(softwareApplicationSlice.actions.deletesoftwareApplicationRequest());
    try {
        const {data} = await axios.delete(`https://portfolio-backend-e7yq.onrender.com/api/v1/application/delete/${id}`,
            {withCredentials: true}
        );
        dispatch(softwareApplicationSlice.actions.deletesoftwareApplicationSuccess(data.message));
        dispatch(softwareApplicationSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(softwareApplicationSlice.actions.deletesoftwareApplicationSliceFail(error.response.data.message));
    }
}

export const clearAllSoftwareAppErrors = () => (dispatch) =>{
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
}

export const resetSoftwareApplicationSlice = () => (dispatch) =>{
    dispatch(softwareApplicationSlice.actions.resetsoftwareApplicationSlice());
}

export default softwareApplicationSlice.reducer;