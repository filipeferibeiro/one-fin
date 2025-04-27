import { useIsDarkMode } from "@/hooks/useIsDarkMode";
import { ArrowDown, ArrowDownCircle, ArrowLeftRight, ArrowUp, ArrowUpCircle } from "lucide-react-native";
import { Text, TouchableOpacity } from "react-native";

{/* <TouchableOpacity
              onPress={() => setTransactionType('expense')}
              className={`flex-1 px-5 py-2 rounded-lg border border-transparent ${
                transactionType === 'expense'
                  && 'bg-red-500 border-red-500'
                }`}
            >
              <Text className={`font-medium text-center ${
                transactionType === 'expense'
                  ? 'text-white'
                  : 'text-black dark:text-white'
              }`}>Despesa</Text>
            </TouchableOpacity> */}


interface TransactionTypeButtonProps {
  type: 'income' | 'expense' | 'transfer';
  actualType?: 'income' | 'expense' | 'transfer';
  onPress: () => void;
}

export function TransactionTypeButton({ type, actualType, onPress }: TransactionTypeButtonProps) {
  const iconSize = 20;
  const iconClassName = "text-gray-500 dark:text-gray-400";

  const isTypeActive = actualType === type;
  const textClassColor = isTypeActive ? 'text-white' : 'text-black dark:text-white';
  const iconColor = isTypeActive || useIsDarkMode() ? '#FFF' : '#000';

  function handleTransactionTypeClass() {
    if (type === 'income') {
      return 'bg-green-500 border-green-500';
    } else if (type === 'expense') {
      return 'bg-red-500 border-red-500';
    } else {
      return 'bg-gray-500 border-gray-500';
    }
  }

  function handleTransactionTypeIcon() {
    if (type === 'income') {
      return <ArrowUp size={iconSize} color={iconColor} className={iconClassName} />;
    } else if (type === 'expense') {
      return <ArrowDown size={iconSize} color={iconColor} className={iconClassName} />;
    } else {
      return <ArrowLeftRight size={iconSize} color={iconColor} className={iconClassName} />;
    }
  }

  function handleTransactionTypeText() {
    if (type === 'income') {
      return 'Income';
    } else if (type === 'expense') {
      return 'Expense';
    } else {
      return 'Transfer';
    }
  }

  return (
    <TouchableOpacity
      className={`flex-1 flex-row items-center justify-center gap-2 px-5 py-2 rounded-lg border border-transparent ${isTypeActive ? handleTransactionTypeClass() : ''}}`}
      onPress={onPress}
    >
      {handleTransactionTypeIcon()}
      <Text className={`text-base font-semibold ${textClassColor}`}>
        {handleTransactionTypeText()}
      </Text>
    </TouchableOpacity>
  );
}