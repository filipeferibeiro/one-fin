import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { formatCurrency } from "@/util/formatCurrency";
import { Landmark } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export function AccountItem({ showBalance }: { showBalance: boolean }) {
  const isDarkMode = useIsDarkMode();
  const iconSize = 20;
  const iconColor = isDarkMode ? "#FFF" : "#000";
  const balance = 12345.67; // Example balance

  return (
    <TouchableOpacity className="flex-row justify-between items-center bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 border border-gray-200 dark:border-neutral-700">
      <View className="flex-row items-center gap-4">
      <View className="bg-purple-500 rounded-full p-2">
          <Landmark size={iconSize} color="#FFF" />
        </View>
        <View>
          <Text className="text-lg font-bold text-black dark:text-white">Nubank</Text>
          {/* <Text className="text-sm text-gray-500 dark:text-gray-400">Type</Text> */}
        </View>
      </View>
      <Text className="text-xl font-bold text-blue-500">
        {showBalance ? (
          formatCurrency(balance)
        ) : (
          "-"
        )}
      </Text>
    </TouchableOpacity>
  );
}