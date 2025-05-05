import { AccountItem } from '@/components/account/AccountItem';
import { CreditCardItem } from '@/components/creditCard/CreditCardItem';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { formatCurrency } from '@/util/formatCurrency';
import { Bell, CreditCard, Eye, EyeOff, Landmark, Moon, Sun } from 'lucide-react-native';
import { colorScheme, useColorScheme } from 'nativewind';
import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'expo-router';
import { useIconColor } from '@/hooks/useIconColor';
import { Button, ButtonIcon } from '@/components/ui/button';
import { Badge, BadgeText } from '@/components/ui/badge';

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
  const { iconColor } = useIconColor();
  const [showBalance, setShowBalance] = useState(true);
  const isDarkMode = useIsDarkMode();

  function toggleBalanceVisibility() {
    setShowBalance((prev) => !prev);
  }

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
          <Button size="lg" variant="outline" className="w-[42] h-[42] relative rounded-full p-3.5">
            <Badge
              className="absolute z-10 h-[20] w-[20] justify-center items-center bg-red-600 rounded-full -right-1.5 -top-1.5"
              variant="solid"
            >
              <BadgeText className="text-white">2</BadgeText>
            </Badge>  
            <ButtonIcon as={Bell} />
          </Button>
          <Button size="lg" variant="outline" className="w-[42] h-[42] rounded-full p-3.5" onPress={toggleBalanceVisibility}>
            <ButtonIcon as={showBalance ? Eye : EyeOff} />
          </Button>
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