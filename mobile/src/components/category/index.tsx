import { Pressable, PressableProps, Text } from "react-native";
import { IconProps as TablerIconProps } from "@tabler/icons-react-native";
import { styles } from "./styles";
import { colors } from "@/styles/theme";

type CategoryProps = PressableProps & {
  iconId: React.ComponentType<TablerIconProps>;
  isSelected?: boolean;
  name: string;
};

export function Category({
  iconId: Icon,
  isSelected = false,
  name,
  ...rest
}: CategoryProps) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerSelected]}
      {...rest}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <Text style={[styles.name, isSelected && styles.nameSelected]}>
        {name}
      </Text>
    </Pressable>
  );
}
