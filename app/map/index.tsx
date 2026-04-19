import CustomMap from "@/presentation/components/maps/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const MapScreen = () => {
  const { lastKnownLocation, getLocation } = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  }, []);

  if (lastKnownLocation === null) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View>
      {/* <MapView
        style={styles.map}
        //provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 43.7083,
          longitude: -79.3927,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      ></MapView> */}
      <CustomMap
        initialLocation={lastKnownLocation}
        showUserLocation={true}
      ></CustomMap>
    </View>
  );
};

export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });
