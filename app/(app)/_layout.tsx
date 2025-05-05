import { useAuth } from "@/hooks/useAuth";
import { Redirect, Slot } from "expo-router";
import { Text } from "react-native";

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  if (!user) {
    return (
      <Redirect href="/login" />
    );
  }

  return (
    <Slot />
  );
}