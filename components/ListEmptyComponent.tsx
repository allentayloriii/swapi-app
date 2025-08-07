import { COLORS } from "@/constants/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface ListEmptyComponentProps {
  loading: boolean;
  message?: string;
}

const ListEmptyComponent = ({
  loading,
  message = "Not items found",
}: ListEmptyComponentProps) => {
  return (
    <View style={styles.emptyContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.text} />
      ) : (
        <Text style={styles.emptyText}>{message}</Text>
      )}
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.inactive,
  },
});
