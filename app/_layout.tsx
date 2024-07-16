import { AuthProvider, useAuth } from "../context/AuthContext";
import { Stack } from "expo-router";

export default function App() {
  const { authState, onLogOut } = useAuth();

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {authState?.authentificated ? (
          <Stack.Screen name="home"></Stack.Screen>
        ) : (
          <Stack.Screen name="index"></Stack.Screen>
        )}
      </Stack>
    </AuthProvider>
  );
}
