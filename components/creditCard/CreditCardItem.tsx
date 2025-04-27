import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { formatCurrency } from "@/util/formatCurrency";
import { formatDate } from "@/util/formatDate";
import { CreditCard } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "../ui/ProgressBar";

export function CreditCardItem({ showBalance }: { showBalance: boolean }) {
  const isDarkMode = useIsDarkMode();
  const iconSize = 20;
  const iconColor = isDarkMode ? "#FFF" : "#000";
  const balance = 12345.67; // Example balance
  const limit = 20000; // Example limit
  const availableLimit = limit - balance;
  const progress = Math.floor((availableLimit / limit) * 100);

  return (
    <TouchableOpacity className="gap-4 bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 border border-gray-200 dark:border-neutral-700">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="bg-orange-500 rounded-full p-2">
            <CreditCard size={iconSize} color="#FFF" />
          </View>
          <View>
            <Text className="text-xl font-bold text-black dark:text-white">Inter</Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">{formatDate(new Date())}</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Invoice</Text>
          <Text className="text-lg font-semibold text-red-600 dark:text-red-400">
            {showBalance ? (
              `- ${formatCurrency(balance)}`
            ) : (
              "-"
            )}
          </Text>
        </View>
      </View>
      <View className="gap-2">
        <ProgressBar progress={progress} barColor="bg-green-500" trackColor="bg-red-300" />
        <View className="flex-row justify-between items-center">
          <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Avaliable Limit</Text>
          <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{showBalance ? formatCurrency(availableLimit) : "-"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}