import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
    name:"timeline",
    initialState:{
        loading: false,
        error: null,
        message: null,
        timeline: []
    },
    reducers:{
        getAllTimelineRequest(state,action){
            state.loading = true;
            state.error = null;
            state.timeline = [];
        },
        getAllTimelineSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.timeline = action.payload;
        },
        getAllTimelineFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.timeline = state.timeline;
        },
        addNewTimelineRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        addNewTimelineSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        addNewTimelineFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        deleteTimelineRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteTimelineSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteTimelineFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetTimelineSlice(state,action){
            state.loading = false;
            state.error = null;
            state.message = null;
            state.timeline = state.timeline;
        },
        clearAllErrors(state,action){
            state.error = null;
        }
    }
});


export const addNewTimeline = (data) => async (dispatch) =>{
    dispatch(timelineSlice.actions.addNewTimelineRequest());
    try {
        const response = await axios.post("http://localhost:5000/api/v1/timeline/add",
            data,
            {
                withCredentials: true,
                headers: {"Content-Type": "application/json"}
            }
        );
        dispatch(timelineSlice.actions.addNewTimelineSuccess(response.data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.addNewTimelineFail(error.response.data.message));
    }
}

export const getAllTimeline = () => async (dispatch) =>{
    dispatch(timelineSlice.actions.getAllTimelineRequest());
    try {
        const {data} = await axios.get("http://localhost:5000/api/v1/timeline/getall",
            {withCredentials: true}
        );
        dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.getAllTimelineFail(error.response.data.message));
    }
}

export const deleteTimeline = (id) => async (dispatch) =>{
    dispatch(timelineSlice.actions.deleteTimelineRequest());
    try {
        const {data} = await axios.delete(`http://localhost:5000/api/v1/timeline/delete/${id}`,
            {withCredentials: true}
        );
        dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
        dispatch(timelineSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(timelineSlice.actions.deleteTimelineFail(error.response.data.message));
    }
}

export const clearAllTimelineErrors = () => (dispatch) =>{
    dispatch(timelineSlice.actions.clearAllErrors());
}

export const resetTimelineSlice = () => (dispatch) =>{
    dispatch(timelineSlice.actions.resetTimelineSlice());
}

export default timelineSlice.reducer;