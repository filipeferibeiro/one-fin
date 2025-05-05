// app/modal/new-transaction.tsx (Exemplo de nome)
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  SafeAreaView, // Para lidar melhor com notches/ilhas
  KeyboardAvoidingView
} from 'react-native'
import { useRouter } from 'expo-router';
import CurrencyInput from 'react-native-currency-input';
// Importe ícones do Lucide
import { X, ChevronDown, Calendar as CalendarIcon, PlusCircle, ViewIcon, ThumbsUp, ThumbsDown, Check } from 'lucide-react-native';
import { TransactionTypeButton } from '@/components/ui/Buttons/TransactionTypeButton';
import { Input } from '@/components/ui/InputOld';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import colors from 'tailwindcss/colors';
import { HStack } from '@/components/ui/hstack';
import { AppInput } from '@/components/ui/AppUI/AppInput';
import { AppSelect } from '@/components/ui/AppUI/AppSelect';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppDateInput } from '@/components/ui/AppUI/AppDateInput';

// -- Interfaces --
interface Account {
  id: string;
  name: string;
}

type TransactionType = 'expense' | 'income' | 'transfer';

// --- Componente da Tela ---
export default function NewTransactionScreen() {
  const router = useRouter(); // Para fechar o modal/navegar

  const iconColor = useIsDarkMode() ? '#FFF' : '#000'; // Cor do ícone com base no tema

  // --- Estados do Formulário ---
  const [paid, setPaid] = useState(true); // Exemplo de estado para controle de pagamento
  const [transactionType, setTransactionType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<number | null>(null); // Valor numérico
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date()); // Data atual (Abril 27, 2025)

  // Contas - Em um app real, viriam do seu estado global/contexto
  const [fromAccount, setFromAccount] = useState<Account | null>({ id: 'acc1', name: 'Conta Corrente Nu' });
  const [toAccount, setToAccount] = useState<Account | null>(null); // Só para transferências

  const [accounts, setAccounts] = useState<SelectItemProps[]>([
    { label: 'Conta Corrente Nu', value: 'acc1' },
    { label: 'Conta Poupança Inter', value: 'acc2' },
  ])

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  function togglePaid() {
    setPaid(!paid);
  }

  // --- Handlers ---
  const handleSaveTransaction = () => {
    console.log('Salvando Transação:', {
      type: transactionType,
      amount,
      description,
      date: date?.toISOString(), // Enviar data em formato padrão
      fromAccount: fromAccount?.id,
      toAccount: transactionType === 'transfer' ? toAccount?.id : undefined,
    });
    // Adicionar lógica para salvar os dados...

    // Fechar a tela/modal após salvar
    if (router.canGoBack()) {
      router.back();
    }
  };

  // --- Renderização ---
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-100 dark:bg-black p-6 gap-4">
      <ScrollView
        className="flex-1 gap-4"
        keyboardShouldPersistTaps="handled" // Fecha teclado ao tocar fora
      >
        <View className="gap-4">
          {/* --- Header --- */}
          <View className='flex-row justify-between items-center'>
            <Text className="text-4xl font-extralight text-black dark:text-white">
              New Transaction
            </Text>
            <TouchableOpacity onPress={togglePaid} className="bg-gray-200 dark:bg-neutral-800 p-3 rounded-full flex-row items-center gap-2">
              {paid ? (
                <ThumbsUp size={20} color={iconColor} />
              ) : (
                <ThumbsDown size={20} color={iconColor} />
              )}
              <Text className="text-black dark:text-white text-base font-bold uppercase tracking-wider">
                {!paid && 'Not '}
                Paid
              </Text>
            </TouchableOpacity>
          </View>
          <HStack className="rounded-full p-1.5 items-center border border-outline-200">
            <TransactionTypeButton actualType={transactionType} type='expense' onPress={() => setTransactionType('expense')} />
            <TransactionTypeButton actualType={transactionType} type='income' onPress={() => setTransactionType('income')} />
            <TransactionTypeButton actualType={transactionType} type='transfer' onPress={() => setTransactionType('transfer')} />
          </HStack>
        </View>

        {/* --- Input de Valor Formatado --- */}
        <CurrencyInput
          value={amount}
          onChangeValue={setAmount}
          prefix="R$ "
          delimiter="." // Milhar
          separator="," // Decimal
          precision={2} // Casas decimais
          minValue={0} // Valor mínimo
          className="text-5xl font-bold text-black dark:text-white text-left w-full pb-2 my-8"
          placeholder="R$ 0,00"
          placeholderTextColor="#9ca3af" // Equivalente a gray-400
          keyboardType="numeric" // Teclado numérico
        />
        <View className="gap-3">
          <AppInput label="Description" placeholder="Ex: Almoço, Salário" />
          <AppSelect label="Account" placeholder="Select an account" items={accounts} />
          {transactionType === 'transfer' && (
            <AppSelect label="Transfer to" placeholder="Select an account" items={accounts} />
          )}
          <AppDateInput label="Date" value={date} onChange={onChangeDate} />
        </View>
      </ScrollView>

      {/* --- Botão Salvar (Fixo no final) --- */}
      <Button size="lg" onPress={handleSaveTransaction}>
        <ButtonIcon as={Check} />
        <ButtonText>Save transaction</ButtonText>
      </Button>
    </KeyboardAvoidingView>
  );
}