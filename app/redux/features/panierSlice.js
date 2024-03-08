import { createSlice } from "@reduxjs/toolkit";

export const panierSlice = createSlice({
    name: "panier",
    initialState: {
        content : []
    },
    reducers: {
        addFavorite: (state, action) => {
            const game = state.content.find(game => game.id === action.payload.id);
            console.log(game);
            if(!game) {
                state.content.push(action.payload);
            }
        },
        removeFavorite: (state, action) => {
            const game = state.content.find(game => game.id === action.payload.id);
            state.content.splice(state.content.indexOf(game), 1);
        },
        removeAllFavorite : (state) => {
            state.content = []
        }
    }
})

export const { addFavorite, removeFavorite, removeAllFavorite } = panierSlice.actions
export default panierSlice.reducer