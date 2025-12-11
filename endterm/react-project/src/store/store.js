import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import animeSlice from "./animeSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    anime: animeSlice,
    favorites: favoritesReducer,
  },
});
