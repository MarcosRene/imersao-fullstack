import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/theme";
import { styles } from "./styles";

type PlaceProps = TouchableOpacityProps & {
  place: Place;
};

export function Place({ place, ...rest }: PlaceProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <Image source={{ uri: place.cover }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {place.description}
        </Text>

        <View style={styles.footer}>
          <IconTicket size={16} color={colors.red.base} />
          <Text style={styles.tickets}>{place.coupons} coupons available</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
