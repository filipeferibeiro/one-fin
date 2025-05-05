import { formatCurrency } from "@/util/formatCurrency";
import { formatDate } from "@/util/formatDate";
import { CreditCard } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { Card } from "../ui/card";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Text } from "../ui/text";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Box } from "../ui/box";

export function CreditCardItem({ showBalance }: { showBalance: boolean }) {
  const iconSize = 20;
  const balance = 12345.67; // Example balance
  const limit = 20000; // Example limit
  const availableLimit = limit - balance;
  const progress = Math.floor((availableLimit / limit) * 100);

  return (
    <TouchableOpacity>
      <Card variant="elevated" className="gap-4 bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
        <HStack className="items-center justify-between">
          <HStack space="md" className="items-center">
            <Box className="bg-orange-500 rounded-full p-2">
              <CreditCard size={iconSize} color="#FFF" />
            </Box>
            <Box>
              <Text className="text-xl font-bold uppercase tracking-wider text-black dark:text-white">Inter</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{formatDate(new Date())}</Text>
            </Box>
          </HStack>
          <Box className="items-end">
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Invoice</Text>
            <Text className="text-lg font-semibold text-red-600 dark:text-red-400">
              {showBalance ? (
                `- ${formatCurrency(balance)}`
              ) : (
                "-"
              )}
            </Text>
          </Box>
        </HStack>
        <VStack space="sm">
          <Progress value={progress} size="sm" orientation="horizontal">
            <ProgressFilledTrack />
          </Progress>
          <HStack className="justify-between items-center">
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avaliable Limit</Text>
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{showBalance ? formatCurrency(availableLimit) : "-"}</Text>
          </HStack>
        </VStack>
      </Card>
    </TouchableOpacity>
  );
}