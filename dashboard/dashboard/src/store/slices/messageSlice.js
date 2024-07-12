import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const messageSlice = createSlice({
    name:"messages",
    initialState:{
        loading: false,
        messages: [],
        error: null,
        message: null
    },
    reducers:{
        getAllMessagesRequest(state,action){
            state.loading = true;
            state.error = null;
            state.messages = [];
        },
        getAllMessagesSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.messages = action.payload;
        },
        getAllMessagesFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.messages = state.messages;
        },
        deleteMessageRequest(state,action){
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        deleteMessageSuccess(state,action){
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        deleteMessageFail(state,action){
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
        resetMessageSlice(state, action) {
            state.error = null;
            state.messages = state.messages;
            state.message = null;
            state.loading = false;
        },
        clearAllErrors(state,action){
            state.error = null;
        }
    }
});


export const getAllMessages = () => async (dispatch) => {
    dispatch(messageSlice.actions.getAllMessagesRequest());
    try {
        const {data} = await axios.get("http://localhost:5000/api/v1/message/getall",{withCredentials: true});
        dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
        dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(messageSlice.actions.getAllMessagesFail(error.response.data.message));
    }
}

export const deleteMessage = (id) => async (dispatch) => {
    dispatch(messageSlice.actions.deleteMessageRequest());
    try {
        const {data} = await axios.delete(`http://localhost:5000/api/v1/message/delete/${id}`,{withCredentials: true});
        dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
        dispatch(messageSlice.actions.clearAllErrors());
    } catch (error) {
        dispatch(messageSlice.actions.deleteMessageFail(error.response.data.message));
    }
}

export const resetMessagesSlice = () => (dispatch) => {
    dispatch(messageSlice.actions.resetMessageSlice());
}

export const clearAllMessageErrors = () => (dispatch)=>{
    dispatch(messageSlice.actions.clearAllErrors());
}

export default messageSlice.reducer;