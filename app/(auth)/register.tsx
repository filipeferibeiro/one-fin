import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router'; // useRouter para navegar após registro se necessário
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig'; // Ajuste o caminho
import { Mail, Lock } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    // Validações básicas
    if (!email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres.');
          return;
    }

    setLoading(true);
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      console.log('Registro bem-sucedido! Redirecionamento via onAuthStateChanged...');
      // O hook useAuth e o AuthLayout cuidarão do redirecionamento para a home.
      // Você pode querer criar um documento de usuário no Firestore aqui também
      // ou fazer alguma ação adicional após o registro bem-sucedido antes do redirect.
      // Ex: router.replace('/(tabs)/'); // Forçar redirect imediato se necessário
    } catch (err: any) {
      console.error("Erro no Registro: ", err.code, err.message);
      let message = 'Ocorreu um erro ao registrar.';
      if (err.code === 'auth/email-already-in-use') {
          message = 'Este e-mail já está em uso.';
      } else if (err.code === 'auth/invalid-email') {
          message = 'O formato do e-mail é inválido.';
      } else if (err.code === 'auth/weak-password') {
          message = 'A senha é muito fraca (mínimo 6 caracteres).';
      } else if (err.code === 'auth/network-request-failed'){
           message = 'Erro de rede. Verifique sua conexão.'
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

    return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
       <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         className="flex-1 justify-center"
       >
        <View className="p-8">
          <Text className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
            Create Account
          </Text>

          {error && (
             <Text className="text-red-500 dark:text-red-400 text-center mb-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-md">{error}</Text>
          )}

          <View className="gap-3">
            {/* Email Input */}
            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="email@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete='email'
            />
            {/* Password Input */}
            <Input 
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="******"
              secureTextEntry
              autoComplete='new-password'
            />
            <Input 
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="******"
              secureTextEntry
              autoComplete='new-password'
            />
            {/* Login Button */}
            <TouchableOpacity
              onPress={handleRegister}
              disabled={loading}
              className={`py-4 rounded-lg items-center ${loading ? 'bg-gray-400 dark:bg-gray-600' : 'bg-blue-600 dark:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800'}`}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold text-base">Register</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Link to Login */}
            <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600 dark:text-gray-400">Já tem uma conta? </Text>
            {/* Usamos 'replace' para não adicionar registro ao histórico quando volta pro login */}
            <Link href="/(auth)" replace asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 dark:text-blue-400 font-medium">Enter</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}