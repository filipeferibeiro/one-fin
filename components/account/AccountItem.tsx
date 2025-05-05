import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { formatCurrency } from "@/util/formatCurrency";
import { Landmark } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Card } from "../ui/card";
import { Text } from "../ui/text";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";

export function AccountItem({ showBalance }: { showBalance: boolean }) {
  const iconSize = 20;
  const balance = 12345.67; // Example balance

  return (
    <TouchableOpacity>
      <Card variant="elevated" className="flex-row justify-between items-center bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
        <HStack space="md" className="flex-row items-center">
          <Box className="bg-purple-500 rounded-full p-2">
            <Landmark size={iconSize} color="#FFF" />
          </Box>
          <Text className="text-lg font-bold uppercase tracking-wider text-black dark:text-white">Nubank</Text>
        </HStack>
        <Text className="text-xl font-bold text-blue-400">
          {showBalance ? (
            formatCurrency(balance)
          ) : (
            "-"
          )}
        </Text>
      </Card>
    </TouchableOpacity>
  );
}