import { AuthProvider } from "../context/AuthContext";
import { Stack } from "expo-router";

export default function App() {
  return (
    <AuthProvider>
      <Stack
      screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{ title: "Welcome", headerShown:true }} />
        <Stack.Screen name="signIn" options={{ title: "Log In", headerShown:true }} />
        <Stack.Screen name="signUp" options={{ title: "Registration", headerShown:true }} />
      </Stack>
    </AuthProvider>
  );
}
