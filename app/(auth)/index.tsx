import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebaseConfig'; // Ajuste o caminho
import { Mail, Lock } from 'lucide-react-native'; // Ícones

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password); // trim() no email
      console.log('Login bem-sucedido! Redirecionamento via onAuthStateChanged...');
      // O hook useAuth e o AuthLayout cuidarão do redirecionamento
    } catch (err: any) {
      console.error("Erro no Login: ", err.code, err.message);
      let message = 'Ocorreu um erro ao fazer login.';
      if (err.code === 'auth/invalid-email' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
          message = 'E-mail ou senha inválidos.';
      } else if (err.code === 'auth/too-many-requests'){
          message = 'Muitas tentativas de login. Tente novamente mais tarde.'
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
            Entrar
          </Text>

          {error && (
            <Text className="text-red-500 dark:text-red-400 text-center mb-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-md">{error}</Text>
          )}

          {/* Email Input */}
          <View className="flex-row items-center bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg mb-4 border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400">
              <Mail size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="E-mail"
                placeholderTextColor="#9ca3af" // gray-400
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete='email' // Ajuda no preenchimento automático
                className="flex-1 text-black dark:text-white text-base"
              />
          </View>

            {/* Password Input */}
            <View className="flex-row items-center bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg mb-6 border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400">
              <Lock size={20} className="text-gray-500 dark:text-gray-400 mr-3" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Senha"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                autoComplete='password' // Ajuda no preenchimento automático
                className="flex-1 text-black dark:text-white text-base"
              />
            </View>


          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className={`py-4 rounded-lg items-center ${loading ? 'bg-gray-400 dark:bg-gray-600' : 'bg-blue-600 dark:bg-blue-700 active:bg-blue-700 dark:active:bg-blue-800'}`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-bold text-base">Entrar</Text>
            )}
          </TouchableOpacity>

          {/* Link to Register */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600 dark:text-gray-400">Não tem uma conta? </Text>
            {/* Usamos 'replace' para não adicionar a tela de login ao histórico quando for para registro */}
            <Link href="/(auth)/register" replace asChild>
                <TouchableOpacity>
                  <Text className="text-blue-500 dark:text-blue-400 font-medium">Registre-se</Text>
              </TouchableOpacity>
            </Link>
          </View>
          {/* TODO: Link Esqueceu Senha */}

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}