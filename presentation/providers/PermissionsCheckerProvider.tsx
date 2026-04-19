import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { router } from "expo-router";
import React, { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";
import { usePermissionsStore } from "../store/usePermissions";

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (locationStatus === PermissionStatus.GRANTED) {
      router.replace("/map");
    } else if (locationStatus !== PermissionStatus.CHECKING) {
      router.replace("/permissions");
    }
  }, [locationStatus]);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(nextAppState);
      if (nextAppState === "active") {
        checkLocationPermission();
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return <>{children}</>;
};

export default PermissionsCheckerProvider;
