import { FlatList } from "react-native";
import { styles } from "./styles";
import { Category } from "../category";
import { categoriesIcons } from "@/utils/categories-icons";

type CategoriesProps = {
  categories: Category[];
  categorySelected: Category | null;
  onSelect(category: Category): void;
};

export function Categories({
  categories,
  categorySelected,
  onSelect,
}: CategoriesProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          iconId={categoriesIcons[item.id]}
          name={item.name}
          onPress={() => onSelect(item)}
          isSelected={item.id === categorySelected?.id}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.container}
    />
  );
}
