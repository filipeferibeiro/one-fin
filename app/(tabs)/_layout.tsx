import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { View, TouchableOpacity, TouchableWithoutFeedbackProps, GestureResponderEvent } from 'react-native'; // Para o botão customizado
import {
  LayoutDashboard, // Ícone para Home/Início
  ArrowRightLeft,  // Ícone para Transações
  PlusSquare,      // Ícone para Novo (Botão Central)
  BarChart3,       // Ícone para Relatórios
  User,             // Ícone para Perfil
  Plus,
  Home
} from 'lucide-react-native';
import { colorScheme } from 'nativewind';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { NewTransactionTabBarButton } from '@/components/ui/TabBar/NewTransactionTabBarButton';


export default function TabLayout() {
  const router = useRouter(); // Hook para navegação programática
  const isDarkMode = useIsDarkMode();

  return (
    <Tabs
      screenOptions={({ route }) => ({ // Usamos ({ route }) para acessar o nome da rota se necessário
        tabBarActiveTintColor: '#3b82f6', // Cor do ícone/label ativo (azul exemplo)
        tabBarInactiveTintColor: 'gray', // Cor do ícone/label inativo
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#000' : '#fff', // Fundo no modo claro
          borderTopWidth: 1,
          borderTopColor: isDarkMode ? '#333' : '#ccc', // Cor da borda superior (light mode)
        },
        headerShown: false, // Oculta o header padrão para todas as telas das abas
        tabBarShowLabel: true, // Mostra os títulos abaixo dos ícones
        tabBarLabelStyle: {
            fontSize: 10,       // Tamanho da fonte do label
            marginBottom: -5,  // Ajusta posição vertical do label
        },
      })}
    >
      {/* Aba 1: Início (Home) */}
      <Tabs.Screen
        name="index" // Mapeia para app/(tabs)/index.tsx
        options={{
          title: 'Home', // Texto da aba
          tabBarIcon: ({ color, focused }) => (
            <Home
              size={24}
              color={color}
              strokeWidth={focused ? 2.5 : 2} // Linha mais grossa se focado
            />
          ),
        }}
      />

      {/* Aba 2: Transações */}
      <Tabs.Screen
        name="transactions" // Mapeia para app/(tabs)/transactions.tsx
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, focused }) => (
            <ArrowRightLeft size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* Aba 3: Botão Central (Nova Transação) */}
      <Tabs.Screen
        name="new-transaction" // Mapeia para app/(tabs)/new-transaction.tsx
        options={{
          title: '', // Sem título para o botão central
          tabBarIcon: () => null,
          tabBarButton: (props) => ( // Define o componente do botão customizado
            <NewTransactionTabBarButton
              {...props}
              onPress={() => {
                router.push('/new-transaction');
              }}
            />
          ),
        }}
      />

      {/* Aba 4: Relatórios */}
      <Tabs.Screen
        name="report" // Mapeia para app/(tabs)/report.tsx
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }) => (
            <BarChart3 size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* Aba 5: Perfil */}
      <Tabs.Screen
        name="profile" // Mapeia para app/(tabs)/profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}