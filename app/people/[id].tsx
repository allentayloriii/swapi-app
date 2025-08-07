import { COLORS } from "@/constants/colors";
import useFetchCharacter from "@/hooks/useFetchCharacter";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const { loading, character } = useFetchCharacter(Number(id));

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.text} animating={true} />
      </View>
    );
  }

  if (!character) {
    return (
      <View>
        <Text style={styles.text}>Film not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.details}>Birth Year: {character.birth_year}</Text>
      <Text style={styles.details}>Height: {character.height}</Text>
      <Text style={styles.details}>Mass: {character.mass}</Text>
      <Text style={styles.details}>Hair Color: {character.hair_color}</Text>
      <Text style={styles.details}>Eye Color: {character.eye_color}</Text>
      <Text style={styles.details}>Gender: {character.gender}</Text>
    </ScrollView>
  );
};

export default DetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  text: { color: "white" },
  name: {
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
  loading: {
    marginTop: 16,
  },
});
