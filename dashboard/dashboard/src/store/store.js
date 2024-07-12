import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import forgotPasswordReducer  from "./slices/forgotPasswordSlice.js";
import messageReducer from "./slices/messageSlice.js";
import timelineReducer from "./slices/timelineSlice.js";
import softwareApplicationReducer from "./slices/softwareApplicationSlice.js";
import skillReducer from "./slices/skillSlice.js";
import projectReducer from "./slices/projectSlice.js";

export const Store = configureStore({
    reducer:{
        user: userReducer,
        forgotPassword: forgotPasswordReducer,
        messages: messageReducer,
        timeline: timelineReducer,
        softwareApplications: softwareApplicationReducer,
        skill: skillReducer,
        project: projectReducer
    }
})