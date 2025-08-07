import { Film } from "@/types/interfaces";
import { useEffect, useState } from "react";

export default function useFetchFilm(id: number) {
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      try {
        // Fetch films from an API or database
        const response = await fetch(`https://swapi.info/api/films/${id}`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error(`Error fetching film ID ${id}: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  return { loading, film };
}
