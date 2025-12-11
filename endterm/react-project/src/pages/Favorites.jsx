import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice";
import AnimeCard from "../components/AnimeCard";
import "./Favorites.css";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  if (favorites.length === 0) return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      <p>Your saved anime will appear here.</p>
    </div>
  );

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      <ul className="favorites-list">
        {favorites.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onFavoriteToggle={() => dispatch(toggleFavorite(anime))}
            isFavorite={true} 
          />
        ))}
      </ul>
    </div>
  );
}
