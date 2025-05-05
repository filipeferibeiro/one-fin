import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Ajuste o caminho
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { Button, ButtonText } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import colors from "tailwindcss/colors"
import { AppInput } from '@/components/ui/AppUI/AppInput';

export default function LoginScreen() {
  const router = useRouter();

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
      router.replace('/(app)/(tabs)'); // Forçar redirect imediato se necessário
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
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center"
      >
        <Box className="p-8">
          <VStack space="xl">
            {/* HEADER */}
            <Heading size="5xl" className="font-thin text-center tracking-wider">One Fin</Heading>
            {error && (
              <Text className="text-red-500 dark:text-red-400 text-center mb-4 px-4 py-2 bg-red-100 dark:bg-red-900 rounded-md">{error}</Text>
            )}
            {/* FORM */}
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="email@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete='email'
            />
            {/* Password Input */}
            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="******"
              secureTextEntry
              autoComplete='password'
            />
            {/* Button Login */}
            <Button size="lg" onPress={handleLogin} disabled={loading}>
              {loading ? (
                <Spinner color={colors.gray[500]} />
              ) : (
                <ButtonText>Login</ButtonText>
              )}
            </Button>
          </VStack>
          {/* No register */}
          <Box className='flex-row justify-center items-center mt-6'>
            <Text>No have account? </Text>
            <Button size="md" variant="link" onPress={() => router.replace('/register')}>
              <ButtonText>Register</ButtonText>
            </Button>
          </Box>
        </Box>
        {/* TODO: Link Esqueceu Senha */}
      </KeyboardAvoidingView>
    </>
  );
}