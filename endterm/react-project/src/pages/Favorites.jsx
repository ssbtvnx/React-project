import React from "react";
import { useSelector } from "react-redux";
import AnimeCard from "../components/AnimeCard";
import { useFavorites } from "../context/FavoritesContext"; 
import "./Favorites.css";

export default function Favorites() {
  const favorites = useSelector((state) => state.favorites.items); 
  const { removeFav } = useFavorites(); 

  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h1>My Favorites</h1>
        <p>Your saved anime will appear here.</p>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      <ul className="favorites-list">
        {favorites.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            onFavoriteToggle={() => removeFav(anime.mal_id)} 
            isFavorite={true}
          />
        ))}
      </ul>
    </div>
  );
}
