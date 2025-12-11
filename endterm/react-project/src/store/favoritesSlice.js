import { createSlice } from "@reduxjs/toolkit";
import { getLocalFavorites } from "../services/favoritesService";

const initialState = {
  items: getLocalFavorites(), 
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const anime = action.payload;
      const exists = state.items.some((a) => a.mal_id === anime.mal_id);
      if (exists) {
        state.items = state.items.filter((a) => a.mal_id !== anime.mal_id);
      } else {
        state.items.push(anime);
      }
      localStorage.setItem("localFavorites", JSON.stringify(state.items));
    },
    setFavorites: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("localFavorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
