import FilmItem from "@/components/FilmItem";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { COLORS } from "@/constants/colors";
import { useFetchFilms } from "@/hooks/useFetchFilms";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";

const Layout = () => {
  const { films, loading, refreshing, onRefresh } = useFetchFilms();

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        keyExtractor={(item) => item.episode_id.toString()}
        renderItem={({ item }) => <FilmItem item={item} />}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
            tintColor={COLORS.text}
          />
        }
        ListEmptyComponent={<ListEmptyComponent loading={loading} />}
      />
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.containerBackground,
  },
});
