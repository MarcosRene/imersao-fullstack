import { useEffect, useRef, useState } from "react";
import { View, Alert, Modal } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import { api } from "@/services/api";
import { Coupon } from "@/components/place-screen/coupon";
import { Loading } from "@/components/loading";
import { PlaceCover } from "@/components/place-screen/cover";
import { PlaceDetails } from "@/components/place-screen/details";
import { Button } from "@/components/button";
import { ScrollView } from "react-native-gesture-handler";

export default function Place() {
  const { id: placeId } = useLocalSearchParams<PlaceDetailsParams>();
  const [coupon, setCoupon] = useState<string | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [_, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  function goToBackScreen() {
    router.back();
  }

  function handleVisibleCameraModalClose() {
    setIsVisibleCameraModal(false);
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Camera", "Permission to access camera was denied");
      }

      qrLock.current = false;
    } catch (error) {
      console.log(error);
      Alert.alert("Camera", "Please try again later!");
    } finally {
      setIsVisibleCameraModal(true);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);

    Alert.alert(
      "Cupom",
      "It is not possible to reuse a redeemed coupon. Do you really want to redeem the coupon?",
      [
        { style: "cancel", text: "No" },
        { text: "Yes", onPress: () => getCouponById(id) },
      ]
    );
  }

  async function getCouponById(id: string) {
    try {
      setCouponIsFetching(true);
      const coupon = await api.get<string>(`/coupons/${id}`);
      setCoupon(coupon.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Coupon fetch error", "Please try again later!");
    } finally {
      setCouponIsFetching(false);
    }
  }

  async function fetchPlaceById() {
    try {
      setIsLoading(true);
      const place = await api.get<Place>(`/markets/${placeId}`);
      setPlace(place.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Place fetch error", "Please try again later!", [
        { text: "OK", onPress: goToBackScreen },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!placeId) return;
    fetchPlaceById();
  }, [placeId, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!place) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PlaceCover uri={place.cover} />
        <PlaceDetails place={place} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Scan QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={handleVisibleCameraModalClose}
            isLoading={couponIsFetching}
          >
            <Button.Title>Go back</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
