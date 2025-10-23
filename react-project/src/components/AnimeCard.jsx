import "./AnimeCard.css"

function AnimeCard({ anime }) {
  return (
    <li className="anime-card">
      <img
        src={anime.images?.jpg?.image_url || "https://via.placeholder.com/200x300"}
        alt={anime.title}
      />
      <h3>{anime.title}</h3>
      <p><strong>Year:</strong> {anime.year || "Unknown"}</p>
      <p><strong>Genres:</strong> {anime.genres.map((g) => g.name).join(", ")}</p>
    </li>
  )
}

export default AnimeCard

