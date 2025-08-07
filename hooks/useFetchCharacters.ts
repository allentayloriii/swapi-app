import { Character } from "@/types/interfaces";
import { useEffect, useState } from "react";

export function useFetchCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://swapi.info/api/people");
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.log("Errors fetching characters: ", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCharacters();
  };

  useEffect(() => {
    fetchCharacters();
  }, [])

  return {characters, refreshing, loading, onRefresh }
}
