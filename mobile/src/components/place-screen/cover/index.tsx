import { ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { Button } from "@/components/button";
import { styles } from "./styles";

type PlaceCoverProps = {
  uri: string;
};

export function PlaceCover({ uri }: PlaceCoverProps) {
  function goToBackScreen() {
    router.back();
  }
  return (
    <ImageBackground source={{ uri }} style={styles.container}>
      <View style={styles.header}>
        <Button onPress={goToBackScreen} style={styles.button}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}
