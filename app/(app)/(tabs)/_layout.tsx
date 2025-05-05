import React from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import {
  Plus,
} from 'lucide-react-native';
import { HStack } from '@/components/ui/hstack';
import { tabsConfig } from '@/config/tabsConfig';
import { Box } from '@/components/ui/box';
import { TabBarButton } from '@/components/ui/TabBar/TabBarButton';
import { Fab, FabIcon } from '@/components/ui/fab';


export default function TabLayout() {
  const router = useRouter(); // Hook para navegação programática
  const segments = useSegments(); // Pega o segment atual
  const path = '/' + segments.join('/'); // Converte os segmentos em uma string de caminho

  const isNewTransaction = path === '/(app)/(tabs)/new-transaction' // Verifica se estamos na tela de nova transação
  
  return (
    <Box className='flex-1'>
      <Box className="flex-1">
        <Slot />
        {!isNewTransaction && (
          <Fab
            size="lg"
            placement="bottom right"
            onPress={() => router.push('/(app)/(tabs)/new-transaction')}
          >
            <FabIcon size="xl" as={Plus} />
          </Fab>
        )}
      </Box>
      <HStack className="content-center w-full justify-between gap-2 p-2 bg-white dark:bg-black border-t border-gray-200 dark:border-neutral-800">
        {tabsConfig.map((tab) => (
          <TabBarButton key={tab.name} href={tab.href} icon={tab.icon} name={tab.name} />
        ))}
      </HStack>
    </Box>
  );
}