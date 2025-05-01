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
  SafeAreaView // Para lidar melhor com notches/ilhas
} from 'react-native';
import { useRouter } from 'expo-router';
import CurrencyInput from 'react-native-currency-input';
// Importe ícones do Lucide
import { X, ChevronDown, Calendar as CalendarIcon, PlusCircle, ViewIcon, ThumbsUp, ThumbsDown, Check } from 'lucide-react-native';
import { TransactionTypeButton } from '@/components/ui/Buttons/TransactionTypeButton';
import { Input } from '@/components/ui/Input';
import { useIsDarkMode } from '@/hooks/useIsDarkMode';
// Para o Date Picker (exemplo usando a biblioteca recomendada)
// import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

// -- Interfaces (Exemplo - ajuste conforme seu app) --
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
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Contas - Em um app real, viriam do seu estado global/contexto
  const [fromAccount, setFromAccount] = useState<Account | null>({ id: 'acc1', name: 'Conta Corrente Nu' });
  const [toAccount, setToAccount] = useState<Account | null>(null); // Só para transferências
  const accounts: Account[] = [ // Lista de exemplo
    { id: 'acc1', name: 'Conta Corrente Nu' },
    { id: 'acc2', name: 'Conta Poupança Inter' },
    { id: 'acc3', name: 'Carteira' },
  ];

  function togglePaid() {
    setPaid(!paid);
  }

  // --- Handlers ---
  const handleSaveTransaction = () => {
    console.log('Salvando Transação:', {
      type: transactionType,
      amount,
      description,
      date: date.toISOString(), // Enviar data em formato padrão
      fromAccount: fromAccount?.id,
      toAccount: transactionType === 'transfer' ? toAccount?.id : undefined,
    });
    // Adicionar lógica para salvar os dados...

    // Fechar a tela/modal após salvar
    if (router.canGoBack()) {
      router.back();
    }
  };

  // Handler para o Date Picker
  // const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
  //   const currentDate = selectedDate || date;
  //   setShowDatePicker(Platform.OS === 'ios'); // No Android fecha sozinho
  //   setDate(currentDate);
  //   if (Platform.OS === 'android') {
  //       setShowDatePicker(false);
  //   }
  // };

  // Função para abrir o seletor de contas (simplificado)
  const selectAccount = (setter: React.Dispatch<React.SetStateAction<Account | null>>) => {
    // Em um app real, abriria um Modal ou Bottom Sheet com a lista de contas
    console.log('Abrir seletor de contas...');
    // Exemplo simples: seleciona a próxima conta da lista (apenas para demonstração)
    const currentIndex = accounts.findIndex(acc => acc.id === (setter === setFromAccount ? fromAccount?.id : toAccount?.id));
    const nextIndex = (currentIndex + 1) % accounts.length;
    // Evita selecionar a mesma conta para origem e destino na transferência
    if (transactionType === 'transfer' && setter === setToAccount && accounts[nextIndex].id === fromAccount?.id) {
        setter(accounts[(nextIndex + 1) % accounts.length]);
    } else if (transactionType === 'transfer' && setter === setFromAccount && accounts[nextIndex].id === toAccount?.id){
        setter(accounts[(nextIndex + 1) % accounts.length]);
    }
     else {
        setter(accounts[nextIndex]);
    }
  };

  // --- Renderização ---
  return (
    <View className="flex-1 bg-gray-100 dark:bg-black px-6 pt-6 pb-12 gap-4">
      <ScrollView
        className="flex-1 gap-4"
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço para o botão Salvar não cobrir conteúdo
        keyboardShouldPersistTaps="handled" // Fecha teclado ao tocar fora
      >
        <View className="gap-4">
          {/* --- Header --- */}
          <View className='flex-row justify-between items-center'>
            <Text className="text-4xl font-extralight text-black dark:text-white">
              Nova Transação
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

          <View className="bg-gray-100 dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-neutral-800 p-1 flex-row gap-1">
            <TransactionTypeButton actualType={transactionType} type='expense' onPress={() => setTransactionType('expense')} />
            <TransactionTypeButton actualType={transactionType} type='income' onPress={() => setTransactionType('income')} />
            <TransactionTypeButton actualType={transactionType} type='transfer' onPress={() => setTransactionType('transfer')} />
          </View>
        </View>

        <View className="gap-3">
          {/* --- Input de Valor Formatado --- */}
          <CurrencyInput
            value={amount}
            onChangeValue={setAmount}
            prefix="R$ "
            delimiter="." // Milhar
            separator="," // Decimal
            precision={2} // Casas decimais
            minValue={0} // Valor mínimo
            className="text-5xl font-thin text-black dark:text-white text-center w-full pb-2 my-4"
            placeholder="R$ 0,00"
            placeholderTextColor="#9ca3af" // Equivalente a gray-400
            keyboardType="numeric" // Teclado numérico
          />

          <Input label='Description' placeholder="Ex: Almoço, Salário" />
          <Input label='Account' placeholder="Nubank" />
          {transactionType === 'transfer' && (
            <Input label='Transfer to' placeholder="Inter" />
          )}
          <Input label='Date' placeholder="01/05/2025" />
        </View>
      </ScrollView>

      {/* --- Botão Salvar (Fixo no final) --- */}
      <View className="absolute bottom-0 left-0 right-0 p-4 mb-8 bg-gray-100 dark:bg-black">
        <TouchableOpacity
          onPress={handleSaveTransaction}
          disabled={!amount || !fromAccount || (transactionType === 'transfer' && !toAccount)} // Desabilita se faltar dados essenciais
          className={`py-4 rounded-full items-center flex-row justify-center gap-2 ${
            !amount || !fromAccount || (transactionType === 'transfer' && !toAccount)
              ? 'bg-gray-400 dark:bg-gray-600' // Cor desabilitado
              : 'bg-blue-600 dark:bg-blue-700' // Cor habilitado
          }`}
        >
          <Check size={20} color="#FFF" />
          <Text className="text-white font-bold text-base">Salvar Transação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}