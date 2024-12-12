import { Text, View } from "react-native";
import { Icon, IconProps } from "@tabler/icons-react-native";

import { styles } from "./styles";
import { colors } from "@/styles/theme";

type InfoProps = {
  description: string;
  icon: React.ComponentType<IconProps>;
};

export function Info({ icon: Icon, description }: InfoProps) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
