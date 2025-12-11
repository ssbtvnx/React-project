import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AnimeCard from "../components/AnimeCard";
import { fetchAnimeList, fetchGenres } from "../services/apiService";
import {
  setSearch,
  setGenre,
  setPage,
  setLimit,
  setTotalPages,
} from "../store/animeSlice";
import { useFavorites } from "../context/FavoritesContext"; 
import "./AnimeList.css";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function AnimeList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addFav, removeFav } = useFavorites(); 

  const { search, genre, page, limit, totalPages } = useSelector(
    (state) => state.anime
  );
  const favorites = useSelector((state) => state.favorites.items); 

  const [animes, setAnimes] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  const loadGenres = useCallback(async () => {
    try {
      const g = await fetchGenres();
      setGenres(g);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadAnimes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (genre) params.set("genre", genre);
      if (page > 1) params.set("page", page);
      if (limit !== 10) params.set("limit", limit);

      navigate({ search: params.toString() }, { replace: true });

      const data = await fetchAnimeList({
        q: debouncedSearch,
        genre,
        page,
        limit,
      });

      setAnimes(data.data || []);
      dispatch(setTotalPages(data.pagination?.last_visible_page || 1));
    } catch (err) {
      console.error(err);
      setError("Failed to load anime list.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, genre, page, limit, navigate, dispatch]);

  useEffect(() => {
    loadGenres();
  }, [loadGenres]);

  useEffect(() => {
    loadAnimes();
  }, [loadAnimes]);

  const clearSearch = () => dispatch(setSearch(""));

  const isFavorite = (anime) =>
    favorites.some((f) => f.mal_id === anime.mal_id);

  const handleFavoriteToggle = (anime) => {
    isFavorite(anime) ? removeFav(anime.mal_id) : addFav(anime);
  };

  return (
    <div className="list-container">
      <div className="top-bar">
        <button onClick={loadAnimes} className="load-btn">
          Load Anime
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search anime..."
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          {search && (
            <button className="clear-btn" onClick={clearSearch}>
              ✕
            </button>
          )}
        </div>

        <select
          value={genre}
          onChange={(e) => dispatch(setGenre(e.target.value))}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          value={limit}
          onChange={(e) => dispatch(setLimit(parseInt(e.target.value)))}
          className="limit-selector"
        >
          {[5, 10, 15, 20].map((n) => (
            <option key={n} value={n}>
              {n} per page
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="anime-list">
        {animes.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onFavoriteToggle={() => handleFavoriteToggle(anime)}
            isFavorite={isFavorite(anime)}
          />
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => dispatch(setPage(Math.min(page + 1, totalPages)))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
