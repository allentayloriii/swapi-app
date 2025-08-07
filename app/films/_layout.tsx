import { COLORS } from "@/constants/colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: COLORS.containerBackground },
      }}
    >
      <Stack.Screen name="index" options={{ title: "All Films" }} />
      <Stack.Screen name="[id]" options={{ title: "Details" }} />
    </Stack>
  );
};

export default Layout;
