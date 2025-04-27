// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';

// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

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

interface CustomTabBarButtonProps {
  onPress: (event: GestureResponderEvent) => void | undefined; // Função a ser chamada ao pressionar o botão
}

// Componente customizado para o botão central '+'
const CustomTabBarButton = ({ onPress }: CustomTabBarButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.9} // Feedback visual ao pressionar
    style={{
      top: -22, // Desloca o botão para cima
      justifyContent: 'center',
      alignItems: 'center',
      // Sombras (opcional e específico da plataforma)
      shadowColor: "#7F5DF0",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5, // Sombra no Android
    }}
    onPress={onPress} // Usa o onPress fornecido pelas Tabs ou o customizado
  >
    <View
      style={{
        width: 65, // Tamanho do botão
        height: 65,
        borderRadius: 35, // Metade do width/height para ser círculo
        backgroundColor: '#3b82f6', // Azul como exemplo (pode vir do tema)
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Ícone dentro do botão central */}
      <Plus size={30} color="#fff" />
    </View>
  </TouchableOpacity>
);

export default function TabLayout() {
  const router = useRouter(); // Hook para navegação programática

  return (
    <Tabs
      screenOptions={({ route }) => ({ // Usamos ({ route }) para acessar o nome da rota se necessário
        tabBarActiveTintColor: '#3b82f6', // Cor do ícone/label ativo (azul exemplo)
        tabBarInactiveTintColor: 'gray', // Cor do ícone/label inativo
        tabBarStyle: {
          // Você pode adicionar estilos condicionais para dark mode aqui se precisar
          // backgroundColor: '#ffffff', // Fundo no modo claro
          height: 65,                // Altura da barra de abas
          paddingBottom: 10,           // Espaçamento inferior para os labels/ícones
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb', // Cor da borda superior (light mode)
          // dark: { backgroundColor: '#111', borderTopColor: '#333' } // Exemplo (requer lógica extra)
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
              size={26}
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
            <ArrowRightLeft size={26} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* Aba 3: Botão Central (Nova Transação) */}
      <Tabs.Screen
        name="new-transaction" // Mapeia para app/(tabs)/new-transaction.tsx
        options={{
          title: '', // Sem título para o botão central
          tabBarIcon: () => null, // O ícone está dentro do CustomTabBarButton
          tabBarButton: (props) => ( // Define o componente do botão customizado
            <CustomTabBarButton
              {...props}
              onPress={() => {
                // Ação customizada ao pressionar o botão '+'
                // Exemplo: Navegar para uma tela modal (se você tiver uma rota modal)
                router.push('/new-transaction');
                // Ou para uma tela normal:
                // router.push('/add-expense');
              }}
            />
          ),
        }}
        // Alternativa usando listeners (se não quiser um botão 100% customizado):
        // listeners={{
        //   tabPress: (e) => {
        //     e.preventDefault(); // Impede a navegação padrão
        //     console.log('Abrir Modal/Tela de Nova Transação via Listener');
        //     // router.push('/modal/new-transaction');
        //   },
        // }}
      />

      {/* Aba 4: Relatórios */}
      <Tabs.Screen
        name="report" // Mapeia para app/(tabs)/report.tsx
        options={{
          title: 'Report',
          tabBarIcon: ({ color, focused }) => (
            <BarChart3 size={26} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />

      {/* Aba 5: Perfil */}
      <Tabs.Screen
        name="profile" // Mapeia para app/(tabs)/profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <User size={26} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}