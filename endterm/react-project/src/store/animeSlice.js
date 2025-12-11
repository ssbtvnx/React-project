import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  genre: "",
  page: 1,
  limit: 10,
  totalPages: 1,
};

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearch: (state, action) => { state.search = action.payload; state.page = 1; },
    setGenre: (state, action) => { state.genre = action.payload; state.page = 1; },
    setPage: (state, action) => { state.page = action.payload; },
    setLimit: (state, action) => { state.limit = action.payload; state.page = 1; },
    setTotalPages: (state, action) => { state.totalPages = action.payload; },
    resetAnimeState: () => initialState, 
  },
});

export const { setSearch, setGenre, setPage, setLimit, setTotalPages, resetAnimeState } = animeSlice.actions;
export default animeSlice.reducer;
