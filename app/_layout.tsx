import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';

import { SafeAreaView } from 'react-native-safe-area-context';
import '@/styles/global.css';
import { useAuth } from '@/hooks/useAuth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user, loading } = useAuth();

  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter-VariableFont.ttf'),
  });

  const isDarkMode = useIsDarkMode();
  const themeMode = isDarkMode ? 'dark' : 'light';

  useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loading]);

  if (!loaded && loading) {
    return null;
  }

  return (
    <GluestackUIProvider mode="system">
      <SafeAreaView className="flex-1 bg-white dark:bg-black">
        <Slot />
      </SafeAreaView>
      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}