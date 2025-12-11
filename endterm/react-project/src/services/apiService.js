const API = "https://api.jikan.moe/v4";

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }
  const data = await res.json();
  return data;
}


export function fetchAnimeList({ q = "", genre = "", page = 1, limit = 10 }) {
  const params = new URLSearchParams();
  if (q) params.append("q", q);
  if (genre) params.append("genres", genre);
  params.append("page", page);
  params.append("limit", limit);

  return request(`${API}/anime?${params.toString()}`);
}


export async function fetchGenres() {
  const data = await request(`${API}/genres/anime`);
  return data.data.map((g) => ({ id: g.mal_id, name: g.name }));
}
