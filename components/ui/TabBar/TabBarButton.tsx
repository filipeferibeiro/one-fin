import { useRouter, useSegments } from "expo-router";
import { Plus } from "lucide-react-native";
import { GestureResponderEvent, Pressable, TouchableOpacity, View } from "react-native";
import { VStack } from "../vstack";
import { useIconColor } from "@/hooks/useIconColor";
import { Text } from "../text";

export function TabBarButton({ href, icon: Icon, name }: TabConfig) {
  const router = useRouter();
  const segments = useSegments(); // Pega o segment atual
  const { iconColor } = useIconColor();

  const path = '/' + segments.join('/'); // Converte os segmentos em uma string de caminho

  function handleNavigateToRoute() {
    router.push(href)
  }

  return (
    <Pressable
      onPress={handleNavigateToRoute} // Navega para a rota correspondente
      className={`flex-1 items-center ${path === href ? 'bg-gray-200 dark:bg-neutral-800' : ''} rounded-lg p-2`}
      android_ripple={{ color: 'rgba(0, 0, 0, 0.1)' }} // Efeito de ripple no Android
    >
      <VStack className="items-center gap-1">
        <Icon size={20} color={iconColor} />
        <Text
          size="xs"
          className={`text-typography-900 tracking-wider ${path === href ? 'font-bold' : 'font-light'}`}
        >
          {name}
        </Text>
      </VStack>
    </Pressable>
  );
}