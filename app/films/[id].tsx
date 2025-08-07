import { COLORS } from "@/constants/colors";
import useCheckFavoriteStatus from "@/hooks/useCheckFavoriteStatus";
import { useFavoriteFilms } from "@/hooks/useFavoriteFilmsStorage";
import useFetchFilm from "@/hooks/useFetchFilm";
import { Film } from "@/types/interfaces";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Page = () => {
  const { id } = useLocalSearchParams();
  const { loading, film } = useFetchFilm(Number(id));
  const { isFavorite, setIsFavorite } = useCheckFavoriteStatus(film);

  const [favorites, setFavorites] = useFavoriteFilms();

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await setFavorites(
          (favorites || []).filter(
            (f: Film) => f.episode_id !== film?.episode_id
          )
        );
      } else {
        await setFavorites([...(favorites || []), film as Film]);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log(`Error toggling favorite ${film?.title}: ${error}`);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.text} animating={true} />
      </View>
    );
  }

  if (!film) {
    return (
      <View>
        <Text style={styles.text}>Film not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={24}
                color={COLORS.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.details}>Episode: {film.episode_id}</Text>
      <Text style={styles.details}>Director: {film.director}</Text>
      <Text style={styles.details}>Producer: {film.producer}</Text>
      <Text style={styles.details}>Release Date: {film.release_date}</Text>
      <Text style={styles.crawl}>Opening Crawl: {film.opening_crawl}</Text>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  text: { color: "white" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  details: {
    marginBottom: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  crawl: {
    fontSize: 16,
    marginTop: 16,
    fontStyle: "italic",
    color: COLORS.text,
  },
  loading: {
    marginTop: 16,
  },
});
