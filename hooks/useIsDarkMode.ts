import { useColorScheme } from "nativewind";

export function useIsDarkMode() {
  const { colorScheme } = useColorScheme();
  return colorScheme === 'dark' ? true : false;
}