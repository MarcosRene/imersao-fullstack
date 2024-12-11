import { useRef } from "react";
import { Text, useWindowDimensions } from "react-native";
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
        renderItem={({ item }) => <Place place={item} />}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text style={styles.title}>Explore places near you</Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
}
