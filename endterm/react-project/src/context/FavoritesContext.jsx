import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFavorites, toggleFavorite } from "../store/favoritesSlice";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useAuth } from "./AuthContext";
import { getLocalFavorites } from "../services/favoritesService";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user) {
        
        dispatch(setFavorites(getLocalFavorites()));
        return;
      }

      const ref = doc(firestore, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const serverFavs = snap.data().favorites || [];
        const localFavs = getLocalFavorites();

        
        const merged = [
          ...serverFavs,
          ...localFavs.filter(
            (lf) => !serverFavs.some((sf) => sf.mal_id === lf.mal_id)
          ),
        ];

        dispatch(setFavorites(merged));
        if (localFavs.length > 0) {
            await updateDoc(ref, { favorites: merged });
            localStorage.removeItem("localFavorites");
        }
      } else {
       
  dispatch(setFavorites([]));
      }
    };

    loadFavorites();
  }, [user, dispatch]);

  const addFav = async (anime) => {
    dispatch(toggleFavorite(anime));

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      const snap = await getDoc(ref);
      const current = snap.exists() ? snap.data().favorites || [] : [];

      const exists = current.some((f) => f.mal_id === anime.mal_id);
      if (!exists) {
        await updateDoc(ref, { favorites: [...current, anime] });
      }
    }
  };

  const removeFav = async (mal_id) => {
    
    dispatch(toggleFavorite({ mal_id }));

    if (user) {
      const ref = doc(firestore, "users", user.uid);
      const snap = await getDoc(ref);
      const current = snap.exists() ? snap.data().favorites || [] : [];
      await updateDoc(ref, {
        favorites: current.filter((f) => f.mal_id !== mal_id),
      });
    }
  };

  return (
    <FavoritesContext.Provider value={{ addFav, removeFav }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
