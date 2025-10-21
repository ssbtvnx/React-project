import "./MovieCard.css"

function MovieCard({ movie }) {
  return (
    <li className="movie-card">
      <img
        src={movie.posterURL || movie.poster || "https://via.placeholder.com/200x300"}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
    </li>
  )
}

export default MovieCard
