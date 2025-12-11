import "./AnimeCard.css";
import { useNavigate } from "react-router-dom";

function AnimeCard({ anime, onFavoriteToggle, isFavorite }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/anime/${anime.mal_id}`);
  };

  return (
    <li className="anime-card">
      <img
        src={anime.images?.jpg?.image_url || "https://via.placeholder.com/200x300"}
        alt={anime.title}
      />
      <h3>{anime.title}</h3>
      <button onClick={goToDetails}>Details</button>

      {onFavoriteToggle && (
        <button
          onClick={() => onFavoriteToggle(anime)}
        >
          {isFavorite ? "Remove" : "🤍 Add"}
        </button>
      )}
    </li>
  );
}

export default AnimeCard;
