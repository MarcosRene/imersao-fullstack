import { Text, View } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";

import { styles } from "./styles";
import { colors } from "@/styles/theme";

type CouponProps = {
  code: string;
};

export function Coupon({ code }: CouponProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Use this coupon</Text>

      <View style={styles.content}>
        <IconTicket size={24} color={colors.green.light} />
        <Text style={styles.code}>{code}</Text>
      </View>
    </View>
  );
}
