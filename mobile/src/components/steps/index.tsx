import { Text, View } from "react-native";
import { IconQrcode, IconMapPin, IconTicket } from "@tabler/icons-react-native";
import { Step } from "../step";
import { styles } from "./styles";

export function Steps() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here's how it works:</Text>

      <Step
        icon={IconMapPin}
        title="Find establishments"
        description="See Nearby partner locations near you"
      />

      <Step
        icon={IconQrcode}
        title="Activate coupon with QR Code"
        description="Scan the code at the establishment to use the benefit"
      />

      <Step
        icon={IconTicket}
        title="Secure advantages near you"
        description="Activate coupons wherever you are, in different types of establishment "
      />
    </View>
  );
}
