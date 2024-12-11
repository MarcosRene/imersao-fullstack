import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { api } from "@/services/api";
import { Categories } from "@/components/categories";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categySelected, setCategySelected] = useState<Category | null>(null);

  function onSelect(category: Category) {
    setCategySelected(category);
  }

  async function fetchCategories() {
    try {
      const response = await api.get<Category[]>("/categories");
      setCategories(response.data);
      setCategySelected(response.data[0]);
    } catch (error) {
      console.error(error);
      Alert.alert("Category fetch error", "Please try again later!");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Categories
        categories={categories}
        categorySelected={categySelected}
        onSelect={onSelect}
      />
    </View>
  );
}
