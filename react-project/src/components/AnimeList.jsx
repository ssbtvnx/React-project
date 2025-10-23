import { useState, useEffect } from "react"
import AnimeCard from "./AnimeCard"
import "./AnimeList.css"

function AnimeList() {
  const [animes, setAnimes] = useState([])
  const [search, setSearch] = useState("")
  const [genre, setGenre] = useState("") // выбранный жанр
  const [genres, setGenres] = useState([]) // все уникальные жанры
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAnimes = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("https://api.jikan.moe/v4/anime")
      const data = await res.json()

      const validAnimes = data.data.filter(
        (anime) => anime.genres && anime.genres.length > 0
      )
      setAnimes(validAnimes)

      // Получаем все уникальные жанры
      const allGenres = [
        ...new Set(validAnimes.flatMap((anime) => anime.genres.map((g) => g.name))),
      ]
      setGenres(allGenres)
    } catch (err) {
      console.error("Failed to load animes:", err)
      setError("Failed to load anime list.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnimes()
  }, [])

  // Фильтрация по названию и жанру
  const filteredAnimes = animes.filter((a)=> {
    const matchesTitle = a.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre ? a.genres.some((g) => g.name === genre) : true
    return matchesTitle && matchesGenre
  })

  const clearSearch = () => setSearch("")

  return (
    <div className="list-container">
      <div className="top-bar">
        <button onClick={fetchAnimes} className="load-btn">
          Load Anime
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search anime..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-btn" onClick={clearSearch}>
              ✕
            </button>
          )}
        </div>

        {/* Выпадающий список жанров */}
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="genre-filter"
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul className="anime-list">
        {filteredAnimes.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ))}
      </ul>
    </div>
  )
}

export default AnimeList
