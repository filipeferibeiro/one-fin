import { AccountItem } from '@/components/account/AccountItem';
import { CreditCardItem } from '@/components/creditCard/CreditCardItem';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { formatCurrency } from '@/util/formatCurrency';
import { Bell, CreditCard, Eye, EyeOff, Landmark, Moon, Sun } from 'lucide-react-native';
import { colorScheme, useColorScheme } from 'nativewind';
import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar } from 'react-native';

type InstrumentType = 'account' | 'card';

interface FinancialInstrument {
  id: string;
  name: string;
  type: InstrumentType;
  balance?: number;
  currentBill?: number;
  limit?: number;
  last4?: string;
  institution: string;
  // iconType and iconName removed
}

// --- Example Static Data ---
// Remember that in a real app, this would come from global state or an API
const currentBalance = 12345.67;
const monthlyIncome = 5000.00;
const monthlyExpenses = 2150.30;

const accountsAndCards: FinancialInstrument[] = [
  {
    id: 'acc1', name: 'Checking Account', type: 'account', balance: 8750.20, institution: 'Nubank',
  },
  {
    id: 'card1', name: 'Platinum Card', type: 'card', currentBill: 1250.80, last4: '1234', institution: 'Nubank',
  },
  {
    id: 'acc2', name: 'Savings Account', type: 'account', balance: 3600.47, institution: 'Inter',
  },
  {
    id: 'card2', name: 'Gold Card', type: 'card', currentBill: 980.55, last4: '5678', institution: 'Inter',
  },
];

// --- Screen Component ---
export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);
  const { setColorScheme } = useColorScheme();
  const isDarkMode = useIsDarkMode();

  function toggleBalanceVisibility() {
    setShowBalance((prev) => !prev);
  }

  function handleChangeDarkMode() {
    if (isDarkMode) {
      setColorScheme('light');
    } else { 
      setColorScheme('dark');
    }
  }

  const renderIcon = (item: FinancialInstrument) => {
    const iconSize = 20;
    const iconClassName = "text-gray-500 dark:text-gray-400";

    if (item.type === 'account') {
      // Use the Landmark icon for accounts
      return <Landmark size={iconSize} color="#FFF" className={iconClassName} />;
    } else {
      // Use the CreditCard icon for cards
      return <CreditCard size={iconSize} color="#FFF" className={iconClassName} />;
    }
  };

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black">
      <View className="px-6 pt-6 pb-12 gap-4">
        {/* --- Greeting (Optional) --- */}
        <View className="flex-row justify-between items-center gap-2">
          <View className="flex-1">
            <Text className="text-lg text-gray-600 dark:text-gray-400">
              Hello!
            </Text>
            <Text className="text-3xl font-bold text-black dark:text-white">
              Filipe Fernandes
            </Text>
          </View>
          <TouchableOpacity className="bg-gray-200 dark:bg-neutral-800 p-3 rounded-full" onPress={handleChangeDarkMode}>
            {isDarkMode ? (
              <Moon color="#FFF" />
            ) : (
              <Sun color="#000" />
            )}
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 dark:bg-neutral-800 p-3 rounded-full" onPress={toggleBalanceVisibility}>
            {showBalance ? (
              <Eye color={isDarkMode ? '#FFF' : '#000'} />
            ) : (
              <EyeOff color={isDarkMode ? '#FFF' : '#000'} />
            )}
          </TouchableOpacity>
        </View>

        {/* --- Current Balance --- */}
        <View className="mt-4">
          <Text className="text-5xl font-thin text-black dark:text-white tracking-tight text-center">
            {showBalance ? (
              formatCurrency(currentBalance)
            ) : (
              "-"
            )}
          </Text>
        </View>

        {/* --- Monthly Summary (Card) --- */}
        <View className="flex-row justify-around bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg border border-gray-200 dark:border-neutral-800">
          <View className="items-center">
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Income (Apr)</Text>
            <Text className="text-lg font-semibold text-green-600 dark:text-green-400">
              {showBalance ? (
                formatCurrency(monthlyIncome)
              ) : (
                "-"
              )}
            </Text>
          </View>
          {/* Subtle divider line */}
          <View className="w-px bg-gray-200 dark:bg-neutral-700" />
          <View className="items-center">
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Expenses (Apr)</Text>
            <Text className="text-lg font-semibold text-red-600 dark:text-red-400">
              {showBalance ? (
                  formatCurrency(monthlyExpenses)
                ) : (
                  "-"
                )}
            </Text>
          </View>
        </View>

        {/* --- SECTION: Accounts and Cards (Using Lucide) --- */}
        <View className="gap-4">
          <Text className="text-lg font-semibold text-black dark:text-white uppercase tracking-wider">
            My Accounts
          </Text>
          <View className="gap-2">
            <AccountItem showBalance={showBalance} />
            <AccountItem showBalance={showBalance} />
            <AccountItem showBalance={showBalance} />
            <AccountItem showBalance={showBalance} />
            <AccountItem showBalance={showBalance} />
          </View>
          <TouchableOpacity className="items-center">
            <Text className="text-blue-500 dark:text-blue-400 font-medium">Manage accounts</Text>
          </TouchableOpacity>

          <Text className="text-lg font-semibold text-black dark:text-white uppercase tracking-wider">
            My Cards
          </Text>
          <View className="gap-2">
            <CreditCardItem showBalance={showBalance} />
            <CreditCardItem showBalance={showBalance} />
            <CreditCardItem showBalance={showBalance} />
            <CreditCardItem showBalance={showBalance} />
            <CreditCardItem showBalance={showBalance} />
          </View>
          <TouchableOpacity className="items-center">
            <Text className="text-blue-500 dark:text-blue-400 font-medium">Manage cards</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}