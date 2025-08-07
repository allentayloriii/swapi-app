import { COLORS } from "@/constants/colors";
import { useFavoriteFilms } from "@/hooks/useFavoriteFilmsStorage";
import { Film } from "@/types/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Favorites = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, , getData, removeFavorite] = useFavoriteFilms();

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await getData();
    } catch (error) {
      console.error("Failed to refresh favorites:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }: { item: Film }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeFavorite(item)}>
        <Ionicons name="trash-outline" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.episode_id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.text}
          />
        }
        renderItem={renderItem}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.itemBackGround,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
