const FAVORITES_KEY = "localFavorites";


export function getLocalFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Failed to parse local favorites:", err);
    return [];
  }
}


export function setLocalFavorites(favs) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (err) {
    console.error("Failed to save local favorites:", err);
  }
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

  setLocalFavorites(updated);
  return updated;
}


export function clearLocalFavorites() {
  localStorage.removeItem(FAVORITES_KEY);
}
