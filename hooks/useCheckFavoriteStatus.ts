import { useFavoriteFilms } from "@/hooks/useFavoriteFilmsStorage";
import { Film } from "@/types/interfaces";
import { useEffect, useState } from "react";

export default function useCheckFavoriteStatus(film: Film | null) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favorites] = useFavoriteFilms();

  useEffect(() => {
    const checkFavoriteStatus = () => {
      if (favorites && film) {
        setIsFavorite(favorites.some((f) => f.episode_id === film.episode_id));
      }
    };

    checkFavoriteStatus();
  }, [favorites, film]);

  return { isFavorite, setIsFavorite };
}
