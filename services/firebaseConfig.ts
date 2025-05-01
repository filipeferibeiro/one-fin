// firebaseConfig.ts (ou .js)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Inicializar Firebase
let app;
if (getApps().length === 0) {
  // Se nenhum app Firebase foi inicializado ainda
  app = initializeApp(firebaseConfig);

  if (Platform.OS === 'web') {
    // Ambiente Web
    initializeAuth(app);
  } else {
    // Ambiente React Native
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} else {
  // Se já foi inicializado (ex: Hot Reload), pega a instância existente
  app = getApp();
}

const auth = getAuth(app); // Obtém a instância do Auth
const db = getFirestore(app); // Obtém a instância do Firestore

// Exporta as instâncias para serem usadas em outras partes do app
export { auth, db };