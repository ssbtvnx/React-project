import { useState, useEffect } from "react"
import MovieCard from "./MovieCard"
import "./MovieList.css"

function MovieList() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://api.sampleapis.com/movies/animation")
      const data = await res.json()
      setMovies(data) 
    } catch (err) {
      console.error("Failed to load movies:", err)
    } finally {
    setLoading(false);
  }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const filteredMovies = movies.filter((m) =>
    m.title?.toLowerCase().includes(search.toLowerCase())
  )

  const clearSearch = () => setSearch("")

  return (
    <div className="list-container">
      <div className="top-bar">
        <button onClick={fetchMovies} className="load-btn">
          Load Movies
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={clearSearch}>
              ✕
            </button>
          )}
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}


      <ul className="movie-list">
        {filteredMovies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
          ))}
      </ul>
    </div>
  )
}

export default MovieList