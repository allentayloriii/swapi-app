import CharacterItem from "@/components/CharacterItem";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { COLORS } from "@/constants/colors";
import { useFetchCharacters } from "@/hooks/useFetchCharacters";
import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

const Characters = () => {
  const { characters, loading, refreshing, onRefresh } = useFetchCharacters();

  return (
    <FlatList
      style={styles.container}
      data={characters}
      keyExtractor={(item) => item.url.split("/").filter(Boolean).pop() || ""}
      renderItem={({ item }) => <CharacterItem item={item} />}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          tintColor={COLORS.text}
        />
      }
      ListEmptyComponent={<ListEmptyComponent loading={loading} />}
    />
  );
};

export default Characters;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
});
