import { ThemedText } from "@/presentation/components/shared/themed-text";
import ThemedPressable from "@/presentation/components/shared/ThemedPressable";
import { usePermissionsStore } from "@/presentation/store/usePermissions";
import React from "react";
import { View } from "react-native";

const PermissionsScreen = () => {
  const { locationStatus, requestLocationPermission } = usePermissionsStore();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ThemedPressable onPress={requestLocationPermission}>
        Habilitar Ubicacion
      </ThemedPressable>
      <ThemedText>Estado actual: {locationStatus}</ThemedText>
    </View>
  );
};

export default PermissionsScreen;
