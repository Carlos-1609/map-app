import { LatLng } from "@/infrastructure/interfaces/let-lng";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import FAB from "../shared/FAB";

interface Props extends ViewProps {
  showUserLocation?: boolean;
  initialLocation: LatLng;
}

const CustomMap = ({
  showUserLocation = true,
  initialLocation,
  ...rest
}: Props) => {
  const {
    watchLocation,
    clearWatchLocation,
    getLocation,
    lastKnownLocation,
    userLocationList,
  } = useLocationStore();

  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [isPolylineVisible, setIsPolylineVisible] = useState(true);
  const mapRef = useRef<MapView>(null);
  useEffect(() => {
    watchLocation();
    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowingUser) {
      moveCameraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowingUser]);

  const moveCameraToLocation = (latLng: LatLng) => {
    if (!mapRef.current) return;

    mapRef.current.animateCamera({
      center: latLng,
    });
  };

  const moveToCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCameraToLocation(initialLocation);
    } else {
      moveCameraToLocation(lastKnownLocation);
    }

    const location = await getLocation();
    if (!location) return;

    moveCameraToLocation(location);
  };
  return (
    <View {...rest}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={showUserLocation}
        onTouchStart={() => setIsFollowingUser(false)}
        //provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {isPolylineVisible && (
          <Polyline
            strokeColor="black"
            strokeWidth={5}
            coordinates={userLocationList}
          />
        )}
      </MapView>

      <FAB
        iconName="compass-outline"
        onPress={() => moveToCurrentLocation()}
        style={{ bottom: 20, right: 20 }}
      />
      <FAB
        iconName={isPolylineVisible ? "eye-outline" : "eye-off-outline"}
        onPress={() => setIsPolylineVisible(!isPolylineVisible)}
        style={{ bottom: 140, right: 20 }}
      />
      <FAB
        iconName={isFollowingUser ? "walk-outline" : "accessibility-outline"}
        onPress={() => setIsFollowingUser(!isFollowingUser)}
        style={{ bottom: 80, right: 20 }}
      />
    </View>
  );
};

export default CustomMap;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
