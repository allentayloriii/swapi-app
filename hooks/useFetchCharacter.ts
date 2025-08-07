import { Character } from "@/types/interfaces";
import { useEffect, useState } from "react";

export default function useFetchCharacter(id: number) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);

      try {
        const response = await fetch(`https://swapi.info/api/people/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.log(`Error while fetching character ID ${id}: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchCharacter();
  }, [id]);

  return { character, loading } as const
}