import { Film } from "@/types/interfaces";
import { useEffect, useState } from "react";

export function useFetchFilms() {
  const [films, setFilms] = useState<Film[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      // Fetch films from an API or database
      const response = await fetch("https://swapi.info/api/films");
      const data = await response.json();
      setFilms(data);
    } catch (error) {
      console.error("Error fetching films:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFilms();
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return { films, refreshing, loading, onRefresh };
}
