import { Text, View } from "react-native";
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native";
import { Info } from "../info";
import { styles } from "./styles";

type PlaceDetailsProps = {
  place: Place;
};

export function PlaceDetails({ place }: PlaceDetailsProps) {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.description}>{place.description}</Text>

        <View style={styles.group}>
          <Text style={styles.title}>Informations</Text>

          <Info
            description={`${place.coupons} coupons availables`}
            icon={IconTicket}
          />
          <Info description={place.address} icon={IconMapPin} />
          <Info description={place.phone} icon={IconPhone} />
        </View>

        <View style={styles.group}>
          <Text style={styles.title}>Regulations</Text>
          {place.rules.map((rule) => (
            <Text key={rule.id} style={styles.rule}>
              {`\u2022 ${rule.description}`}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
