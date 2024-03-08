import { createSlice } from "@reduxjs/toolkit";

export const logsSlice = createSlice({
    name: "logs",
    initialState: {
        data : [],
        loggedIn : false,
        user : ""
    },
    reducers: {
        addLog: (state, action) => {
            state.data.push(action.payload)
            console.log(state.data);
        },
        checkLog: (state, action) => {
            console.log(action.payload.username, action.payload.password);
            // console.log(action.payload)
            let test = state.data.find(element => element.username === action.payload.username && element.password === action.payload.password)
            if (test) {
                state.user = action.payload.username
                state.loggedIn = true
            } else {
                console.log(false);
                state.loggedIn = false
            }
        },
        logout: (state) => {
            state.loggedIn = false
        }
    }
})

export const { addLog, checkLog,logout } = logsSlice.actions
export default logsSlice.reducer