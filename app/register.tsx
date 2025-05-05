import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router'; // useRouter para navegar após registro se necessário
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Ajuste o caminho
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Button, ButtonText } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import colors from 'tailwindcss/colors';
import { Text } from '@/components/ui/text';
import { AppInput } from '@/components/ui/AppUI/AppInput';
// import { Input } from '@/components/ui/Input';

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

      router.replace('/(app)/(tabs)'); // Forçar redirect imediato se necessário
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
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         className="flex-1 justify-center"
       >
        <Box className="p-8">
          <VStack space="xl">
            {/* HEADER */}
            <Heading size="3xl" className="font-thin text-center tracking-wider">Create account</Heading>
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
              helperText="(6 characters minimum)"
              value={password}
              onChangeText={setPassword}
              placeholder="******"
              secureTextEntry
              autoComplete='new-password'
            />
            {/* Confirm Password Input */}
            <AppInput
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="******"
              secureTextEntry
              autoComplete='new-password'
            />
            {/* Register Button */}
            <Button size="lg" onPress={handleRegister} disabled={loading}>
              {loading ? (
                <Spinner color={colors.gray[500]} />
              ) : (
                <ButtonText>Register</ButtonText>
              )}
            </Button>
          </VStack>
          {/* Link to Login */}
          <Box className='flex-row justify-center items-center mt-6'>
            <Text>Already have an account? </Text>
            <Button size="md" variant="link" onPress={() => router.replace('/login')}>
              <ButtonText>Enter</ButtonText>
            </Button>
          </Box>
        </Box>
    </KeyboardAvoidingView>
  );
}