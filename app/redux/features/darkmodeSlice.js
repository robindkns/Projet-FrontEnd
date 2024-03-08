import { createSlice } from "@reduxjs/toolkit";

export const darkmodeSlice = createSlice({
    name: "darkmode",
    initialState: {
        darkmode : true
    },
    reducers: {
        changeMode: (state) => {
            state.darkmode = !state.darkmode
        },
        
    }
})

export const { changeMode } = darkmodeSlice.actions
export default darkmodeSlice.reducer