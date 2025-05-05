import { Box } from '@/components/ui/box';
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { ChevronDown } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
export default function ProfileScreen() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  const capitalizedColorScheme = (colorScheme && colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)) || undefined;

  async function handleSignOut() {
    try {
      await signOut(auth); // Chama a função de logout do Firebase
      console.log('Usuário deslogado com sucesso!');
      
      router.replace('/login'); // Exemplo de navegação manual (menos ideal)

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout. Verifique sua conexão e tente novamente.');
    }
  };

  function handleChangeTheme(value: "light" | "dark" | "system") {
    setColorScheme(value);
  }

  return (
    <View className="flex-1 bg-gray-100 dark:bg-black px-6 pt-6 pb-12 gap-4">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço para o botão Salvar não cobrir conteúdo
        keyboardShouldPersistTaps="handled" // Fecha teclado ao tocar fora
      >
        <View className="gap-4">
          <Text className="text-4xl font-extralight text-black dark:text-white">
            Profile
          </Text>
          <Box className="gap-1">
            <Text className="text-lg font-bold uppercase text-black dark:text-white tracking-wider">
              Theme
            </Text>
            <Select
              initialLabel={capitalizedColorScheme}
              selectedValue={colorScheme}
              onValueChange={(value) => handleChangeTheme(value as "light" | "dark" | "system")}
            >
              <SelectTrigger variant="outline" size="md" className="flex-row items-center justify-between">
                <SelectInput className="py-2" placeholder="Select a theme" />
                <SelectIcon className="mr-3" as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Light" value="light" />
                  <SelectItem label="Dark" value="dark" />
                  <SelectItem label="System" value="system" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
          <TouchableOpacity
            className="bg-red-200 dark:bg-red-800 p-3 rounded-full"
            onPress={handleSignOut}
          >
            <Text className="text-black dark:text-white text-base text-center font-bold uppercase tracking-wider">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}