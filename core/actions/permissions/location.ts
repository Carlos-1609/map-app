import { PermissionStatus } from "@/infrastructure/interfaces/location";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export const requestLocationPermission =
  async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestBackgroundPermissionsAsync();

    if (status !== "granted") {
      if (status === "denied") {
        manualPermissionRequest();
      }
      return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
  };

export const checkLocationPermission = async () => {
  const { status } = await Location.getForegroundPermissionsAsync();

  switch (status) {
    case "granted":
      return PermissionStatus.GRANTED;
    case "denied":
      return PermissionStatus.DENIED;
    default:
      return PermissionStatus.UNDETERMINED;
  }
};

export const manualPermissionRequest = async () => {
  Alert.alert(
    "Permiso de ubicacion necesario",
    "Para continuara debe habilitar de location en los ajustes de la app",
    [
      {
        text: "Abrir Ajustes",
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: "Cancel",
        style: "destructive",
      },
    ],
  );
};
