import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Ajuste o caminho se necessário

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Estado inicial de carregamento

  useEffect(() => {
    // Escuta mudanças no estado de autenticação
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Define o usuário (pode ser null)
      setLoading(false); // Para de carregar quando o estado é determinado
    });

    // Limpa a inscrição ao desmontar o componente
    return () => unsubscribe();
  }, []); // Array vazio garante que rode só na montagem/desmontagem

  return { user, loading };
}