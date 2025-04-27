import { Bell, CreditCard, Eye, EyeOff, Landmark } from 'lucide-react-native';
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

  function toggleBalanceVisibility() {
    setShowBalance((prev) => !prev);
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
      <View className="p-6 gap-4">

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
          <TouchableOpacity className="bg-gray-200 dark:bg-neutral-800 p-3 rounded-full">
            <Bell color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 dark:bg-neutral-800 p-3 rounded-full" onPress={toggleBalanceVisibility}>
            {showBalance ? (
              <Eye color="#FFF" />
            ) : (
              <EyeOff color="#FFF" />
            )}
          </TouchableOpacity>
        </View>

        {/* --- Current Balance --- */}
        <View className="mt-4">
          <Text className="text-5xl font-thin text-black dark:text-white tracking-tight text-center">
            R$ {showBalance ? currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
          </Text>
        </View>

        {/* --- Monthly Summary (Card) --- */}
        <View className="flex-row justify-around bg-gray-100 dark:bg-neutral-900 p-4 rounded-lg border border-gray-200 dark:border-neutral-800">
          <View className="items-center">
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Income (Apr)</Text>
            <Text className="text-lg font-semibold text-green-600 dark:text-green-400">
              R$ {showBalance ? monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-'}
            </Text>
          </View>
          {/* Subtle divider line */}
          <View className="w-px bg-gray-200 dark:bg-neutral-700" />
          <View className="items-center">
            <Text className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Expenses (Apr)</Text>
            <Text className="text-lg font-semibold text-red-600 dark:text-red-400">
              R$ {showBalance ? monthlyExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-'}
            </Text>
          </View>
        </View>

        {/* --- SECTION: Accounts and Cards (Using Lucide) --- */}
        <View>
          <Text className="text-lg font-semibold text-black dark:text-white mb-4">
            Accounts and Cards
          </Text>
          {accountsAndCards.length > 0 ? (
            <View className="space-y-3 gap-2">
              {accountsAndCards.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="flex-row items-center p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700"
                  // onPress={() => router.push(`/details/${item.id}`)}
                >
                  {/* Icon (Using the updated renderIcon function) */}
                  <View className="w-8 h-8 mr-4 items-center justify-center bg-gray-200 dark:bg-neutral-700 rounded-full">
                    {renderIcon(item)}
                  </View>

                  {/* Name and Details (No changes) */}
                  <View className="flex-1 mr-2">
                    {/* ... */}
                    <Text className="text-sm font-semibold text-black dark:text-white" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="text-xs text-gray-500 dark:text-gray-400">
                      {item.type === 'account' ? `Account balance` : `Current bill ${item.last4 ? `• ${item.last4}` : ''}`}
                    </Text>
                  </View>

                  {/* Value (Balance or Bill) (No changes) */}
                  <Text
                    className={`text-sm font-medium ${
                      item.type === 'account' ? 'text-black dark:text-white' : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {/* ... */}
                    {item.type === 'account'
                      ? `R$ ${showBalance ? item.balance?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-' }`
                      : `R$ ${showBalance ? item.currentBill?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '-' }`
                    }
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
             <Text className="text-center text-gray-500 dark:text-gray-400 mt-4">
              No accounts or cards added.
            </Text>
          )}
           {/* --- Manage Accounts (Optional) --- */}
           {accountsAndCards.length > 0 && (
            <TouchableOpacity className="mt-4 items-center">
              <Text className="text-blue-500 dark:text-blue-400 font-medium">Manage accounts</Text>
            </TouchableOpacity>
          )}
        </View>

      </View>
    </ScrollView>
  );
}