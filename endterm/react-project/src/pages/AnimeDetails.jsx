import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AnimeDetails.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
      const data = await res.json();
      setAnime(data.data);
    };
    fetchAnime();
  }, [id]);

  if (!anime) return <p>Loading...</p>;

  return (
    <div>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h2>{anime.title}</h2>
      <img src={anime.images.jpg.image_url} alt={anime.title} />
      <p><strong>Year:</strong> {anime.year}</p>
      <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
      <p><strong>Synopsis:</strong> {anime.synopsis}</p>
      <p><strong>Episodes:</strong> {anime.episodes}</p>
      <p><strong>Rating:</strong> {anime.rating}</p>
      <p><strong>Score:</strong> {anime.score}</p>
    </div>
  );
};

export default AnimeDetails;
