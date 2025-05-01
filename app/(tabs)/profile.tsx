import { auth } from '@/services/firebaseConfig';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { View, Text, ScrollView, Alert, TouchableOpacity } from 'react-native';
export default function ProfileScreen() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await signOut(auth); // Chama a função de logout do Firebase
      console.log('Usuário deslogado com sucesso!');
      
      router.replace('/(auth)'); // Exemplo de navegação manual (menos ideal)

    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout. Verifique sua conexão e tente novamente.');
    }
  };

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