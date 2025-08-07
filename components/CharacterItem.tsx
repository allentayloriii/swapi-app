import { COLORS } from "@/constants/colors";
import { Character } from "@/types/interfaces";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CharacterItem = ({ item }: { item: Character }) => {
  const id = item.url.split("/").filter(Boolean).pop(); // Extracting ID from URL

  return (
    <Link href={`/people/${id}`} asChild>
      <TouchableOpacity style={styles.characterItem}>
        <Text style={styles.characterName}>{item.name}</Text>
        <Text
          style={styles.characterDetailText}
        >{`Birth Year: ${item.birth_year}`}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default CharacterItem;

const styles = StyleSheet.create({
  characterItem: {
    backgroundColor: COLORS.background,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  characterName: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 18,
  },
  characterDetailText: {
    fontSize: 14,
    color: "white",
  },
});
