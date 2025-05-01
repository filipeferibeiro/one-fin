import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth'; // Ajuste o caminho

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    // Pode mostrar um loader aqui também se a transição demorar
    return null; // Ou um ActivityIndicator
  }

  if (user) {
    // Se o usuário está logado e tentou acessar uma rota de autenticação,
    // redireciona para a tela principal do app (ex: a primeira aba)
    console.log('Usuário logado no AuthLayout, redirecionando...');
    return <Redirect href="/(tabs)" />; // Ajuste o href se o grupo principal for diferente
  }

  // Se o usuário não está logado, mostra as telas de autenticação (Login, Registro)
  // Usamos Stack para navegação entre Login e Registro.
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}