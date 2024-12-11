import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { api } from "@/services/api";
import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { colors } from "@/styles/colors";

export default function Home() {
  const [categySelected, setCategySelected] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  function onSelect(category: Category) {
    setCategySelected(category);
  }

  async function fetchCategories() {
    try {
      const categories = await api.get<Category[]>("/categories");
      setCategories(categories.data);
      setCategySelected(categories.data[0]);
    } catch (error) {
      console.error(error);
      Alert.alert("Category fetch error", "Please try again later!");
    }
  }

  async function fetchPlaces() {
    try {
      if (!categySelected) return;

      const places = await api.get<Place[]>(
        `/markets/category/${categySelected.id}`
      );
      setPlaces(places.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Places fetch error", "Please try again later!");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [categySelected]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#CECECE",
      }}
    >
      <Categories
        categories={categories}
        categorySelected={categySelected}
        onSelect={onSelect}
      />

      <Places places={places} />
    </View>
  );
}
