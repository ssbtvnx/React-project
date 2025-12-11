const FAVORITES_KEY = "localFavorites";


export function getLocalFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function toggleLocalFavorite(anime) {
  const favs = getLocalFavorites();
  const exists = favs.some((a) => a.mal_id === anime.mal_id);

  let updated;
  if (exists) {
    updated = favs.filter((a) => a.mal_id !== anime.mal_id);
  } else {
    updated = [...favs, anime];
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}
