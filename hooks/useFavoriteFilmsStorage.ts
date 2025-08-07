import { FAVORITES_KEY } from "@/constants/storage-keys";
import useAsyncStorage from "@/hooks/useAsyncStorage";
import { Film } from "@/types/interfaces";
import { useCallback, useMemo } from "react";

export function useFavoriteFilms() {
  const { value: favorites, setData, getData } = useAsyncStorage<Film[]>(FAVORITES_KEY);

  const removeFavorite = useCallback(
    async (film: Film) => {
      setData(
        (favorites || []).filter((f) => f.episode_id !== film.episode_id)
      );
    },
    [favorites, setData]
  );

  return useMemo(() => [
    favorites,
    setData,
    getData,
    removeFavorite
  ] as const, [favorites, setData, getData, removeFavorite])
}
