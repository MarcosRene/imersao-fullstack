import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Place } from "../place";
import { styles } from "./styles";

type PlaceProps = {
  places: Place[];
};

export function Places({ places }: PlaceProps) {
  const dimentions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = { MIN: 278, MAX: dimentions.height - 128 };

  function goToPlaceDetails(placeId: string) {
    router.navigate(`/place/${placeId}`);
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.MIN, snapPoints.MAX]}
      handleIndicatorStyle={styles.indicator}
      backgroundStyle={styles.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Place place={item} onPress={() => goToPlaceDetails(item.id)} />
        )}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.title}>Explore places near you</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
