import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { router } from "expo-router";
import { api } from "@/services/api";
import { Categories } from "@/components/categories";
import { Places } from "@/components/places";
import { colors, fontFamily } from "@/styles/theme";

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categySelected, setCategySelected] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);

  function onSelect(category: Category) {
    setCategySelected(category);
  }

  function goToPlaceDetails(placeId: string) {
    router.navigate(`/place/${placeId}`);
  }

  async function fetchCategories() {
    try {
      const categories = await api.get<Category[]>("/categories");
      setCategories(categories.data);
      setCategySelected(categories.data[0]);
    } catch (error) {
      console.error(error);
      Alert.alert("Category fetch error", "Please try again later!");
    }
  }

  async function fetchPlaces() {
    try {
      if (!categySelected) return;

      const places = await api.get<Place[]>(
        `/markets/category/${categySelected.id}`
      );
      setPlaces(places.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Places fetch error", "Please try again later!");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPlaces();
  }, [categySelected]);

  return (
    <View style={{ flex: 1 }}>
      <Categories
        categories={categories}
        categorySelected={categySelected}
        onSelect={onSelect}
      />

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {places.map((place) => (
          <Marker
            key={place.id}
            identifier={place.id}
            coordinate={{
              latitude: Number(place.latitude),
              longitude: Number(place.longitude),
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => goToPlaceDetails(place.id)}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: fontFamily.medium,
                  color: colors.gray[600],
                }}
              >
                {place.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fontFamily.regular,
                  color: colors.gray[600],
                }}
              >
                {place.address}
              </Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places places={places} />
    </View>
  );
}
