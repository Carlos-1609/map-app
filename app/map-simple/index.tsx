import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 43.7083,
          longitude: -79.3927,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: 43.7084203,
            longitude: -79.3912967,
          }}
          title="Aqui Estoy"
          description="Esta es mi casa en toronto"
        />
        <Marker
          coordinate={{
            latitude: 43.7041332,
            longitude: -79.4001106,
          }}
          title="Farm Boy"
          description="Este es el super farm boy"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
