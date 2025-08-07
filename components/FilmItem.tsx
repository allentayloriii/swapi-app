import { COLORS } from "@/constants/colors";
import { Film } from "@/types/interfaces"; // Assuming you have a Film type defined
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FilmItem = ({ item }: { item: Film }) => {
  const id = item.url.split("/").filter(Boolean).pop(); // Extracting ID from URL

  return (
    <Link href={`/films/${id}`} asChild>
      <TouchableOpacity style={styles.filmItem}>
        <Text style={styles.filmTitle}>{item.title}</Text>
        <Text
          style={styles.filmDetailText}
        >{`Episode: ${item.episode_id}`}</Text>
        <Text
          style={styles.filmDetailText}
        >{`Director: ${item.director}`}</Text>
        <Text
          style={styles.filmDetailText}
        >{`Release Date: ${item.release_date}`}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default FilmItem;

const styles = StyleSheet.create({
  filmItem: {
    backgroundColor: COLORS.background,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  filmTitle: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 18,
  },
  filmDetailText: {
    fontSize: 14,
    color: "white",
  },
});
