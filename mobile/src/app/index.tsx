import { View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/button";
import { Steps } from "@/components/steps";
import { Welcome } from "@/components/welcome";

export default function App() {
  function goToHome() {
    router.navigate("/home");
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 40,
        gap: 40,
      }}
    >
      <Welcome />
      <Steps />
      <Button onPress={goToHome}>
        <Button.Title>Get Started</Button.Title>
      </Button>
    </View>
  );
}
