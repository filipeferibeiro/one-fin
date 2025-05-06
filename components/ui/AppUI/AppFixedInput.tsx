import { TouchableOpacity } from "react-native";
import { Box } from "../box";
import { HStack } from "../hstack";
import { Text } from "../text";
import { VStack } from "../vstack";
import { useState } from "react";
import { X } from "lucide-react-native";
import { useIconColor } from "@/hooks/useIconColor";

interface AppFixedInputProps {
  label: string;
  helperText?: string;
} 

export function AppFixedInput({ label, helperText }: AppFixedInputProps) {
  const { iconColor } = useIconColor();

  const [type, setType] = useState<'fixed' | 'installment' | null>(null);

  return (
    <VStack space="xs">
      <Box className="flex-row items-center justify-between">
        <Text className="text-sm text-typography-500 uppercase tracking-wider">{label}</Text>
        <Text className="text-xs text-typography-500">{helperText}</Text>
      </Box>
      <VStack className="rounded border border-background-300 p-1 gap-1">
        <HStack space="xs">
          <TouchableOpacity
            className={`flex-1 items-center justify-center flex-row gap-2 rounded px-3 py-1.5 ${type === 'fixed' && "bg-background-500 dark:bg-background-100"}`}
            onPress={() => setType('fixed')}
          >
            <Text className={`text-base font-bold`}>
              Fixed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 items-center justify-center flex-row gap-2 rounded px-3 py-1.5 ${type === 'installment' && "bg-background-500 dark:bg-background-100"}`}
            onPress={() => setType('installment')}
          >
            <Text className={`text-base font-bold`}>
              Installment
            </Text>
          </TouchableOpacity>
        </HStack>
        {type && (
          <HStack className="p-2">
            <Text className="flex-1">Mês - {type}</Text>
            <TouchableOpacity onPress={() => setType(null)}>
              <X size={20} color={iconColor} />
            </TouchableOpacity>
          </HStack>
        )}
      </VStack>
    </VStack>
  )
}