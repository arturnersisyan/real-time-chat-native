import { useContext, useEffect } from "react";
import { Redirect, router, Stack } from "expo-router";

export default function start() {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}