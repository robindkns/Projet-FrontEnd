import { configureStore } from "@reduxjs/toolkit"
import logsSlice from "./features/logsSlice"
import panierSlice from "./features/panierSlice"
import darkmodeSlice from "./features/darkmodeSlice"

export const store = configureStore({
    reducer: {
        logs : logsSlice,
        panier : panierSlice,
        darkmode : darkmodeSlice
    },
})

export default store