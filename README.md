# 🌟 One-Fin: Your Personal Finance Manager

Welcome to **One-Fin**, a modern and intuitive personal finance management app built with [Expo](https://expo.dev). Manage your accounts, track expenses, and stay on top of your financial goals—all in one place.

---

## 🚀 Features

- **Account and Card Management**: View balances, bills, and transaction details.
- **Dark Mode Support**: Seamlessly switch between light and dark themes.
- **Interactive UI**: Smooth animations and haptic feedback for a delightful user experience.
- **Cross-Platform**: Runs on Android, iOS, and Web with a consistent design.
- **Customizable Tabs**: Navigate easily with a central action button for quick transactions.

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev) with [Expo](https://expo.dev)
- **Routing**: [Expo Router](https://expo.github.io/router/docs)
- **Styling**: [Tailwind CSS](https://tailwindcss.com) via [NativeWind](https://www.nativewind.dev)
- **Icons**: [Lucide React Native](https://lucide.dev)
- **State Management**: React Hooks
- **Animations**: [Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/filipeferibeiro/one-fin.git
   cd one-fin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npx expo start
   ```

4. Open the app on your device:

   - Use the **QR code** in the terminal with the [Expo Go](https://expo.dev/client) app.
   - Or run it on an emulator/simulator:
     - **Android**: `npm run android`
     - **iOS**: `npm run ios`
     - **Web**: `npm run web`

---

## Configuração do Firebase

Este projeto utiliza Firebase para funcionalidades como Autenticação e Banco de Dados Firestore. Para rodar o projeto localmente, você precisa conectá-lo ao seu próprio projeto Firebase, gerando os arquivos de configuração necessários.

Estes arquivos (`google-services.json` para Android e `GoogleService-Info.plist` para iOS) geralmente **não são incluídos no repositório Git** por motivos de segurança e para permitir que cada desenvolvedor use seu próprio ambiente Firebase durante o desenvolvimento.

Siga estes passos para configurar o seu ambiente local:

### 1. Crie ou Acesse um Projeto Firebase

* Vá até o [Firebase Console](https://console.firebase.google.com/).
* Faça login com sua Conta Google.
* Crie um novo projeto Firebase ou selecione um projeto existente que você deseja usar para este aplicativo.

### 2. Ative os Serviços Necessários no Firebase

Dentro do console do seu projeto Firebase, certifique-se de que os seguintes serviços estão ativados e configurados minimamente:

* **Authentication (Autenticação):**
    * Navegue até a seção "Authentication".
    * Vá para a aba "Sign-in method" (Método de login).
    * Ative os provedores de login que este projeto utiliza (ex: "E-mail/senha", "Google", etc.). Para o login com Google, um passo adicional de configuração SHA-1 para Android será necessário (veja abaixo).
* **Firestore Database:**
    * Navegue até a seção "Firestore Database".
    * Clique em "Criar banco de dados" se ainda não houver um.
    * Escolha o **modo de produção** (recomendado para segurança) ou o modo de teste. Lembre-se de configurar as [Regras de Segurança](https://firebase.google.com/docs/firestore/security/get-started) adequadamente.
    * Selecione uma localização para o servidor do Firestore (ex: `southamerica-east1` para São Paulo).

### 3. Registre o App iOS no Firebase

1.  Nas "Configurações do Projeto" (⚙️ > Configurações do projeto).
2.  Na aba "Geral", role para baixo até "Seus apps".
3.  Clique em "Adicionar app" e selecione o ícone do **iOS** ().
4.  No campo **"ID do pacote Apple"**, insira o valor exato encontrado no arquivo `app.json` (ou `app.config.js`) deste projeto, sob a chave `expo.ios.bundleIdentifier`.
5.  (Opcional) Dê um apelido ao app iOS.
6.  Clique em "Registrar app".
7.  **Faça o download do arquivo `GoogleService-Info.plist`**.
8.  Clique em "Próxima" nas etapas seguintes e depois em "Continuar no console" (pode ignorar os passos de instalação da SDK mostrados ali).

### 4. Registre o App Android no Firebase

1.  Nas "Configurações do Projeto" > "Seus apps", clique em "Adicionar app" e selecione o ícone do **Android** (🤖).
2.  No campo **"Nome do pacote Android"**, insira o valor exato encontrado no arquivo `app.json` (ou `app.config.js`) deste projeto, sob a chave `expo.android.package`.
3.  (Opcional) Dê um apelido ao app Android.
4.  No campo **"Certificado de assinatura de depuração SHA-1"**:
    * Esta chave é **obrigatória** se o app usar Login com Google ou Autenticação por Telefone.
    * Se o arquivo `~/.android/debug.keystore` não existir na sua máquina, você precisará gerá-lo primeiro. Abra o terminal e execute:
        ```bash
        mkdir -p ~/.android && keytool -genkey -v -keystore ~/.android/debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
        ```
    * Após garantir que o arquivo existe, obtenha a chave SHA-1 executando no terminal:
        ```bash
        keytool -list -v -alias androiddebugkey -keystore ~/.android/debug.keystore -storepass android
        ```
    * Copie o valor da impressão digital **SHA-1** exibido e cole-o no campo correspondente no console do Firebase.
    * *Observação:* Se você usa EAS Build, pode obter essas chaves também via `eas credentials` e precisará adicionar tanto a SHA-1 de desenvolvimento quanto a de produção (gerada pelo Google Play ou pelo EAS) no Firebase.
5.  Clique em "Registrar app".
6.  **Faça o download do arquivo `google-services.json`**.
7.  Clique em "Próxima" e "Continuar no console".

### 5. Posicione os Arquivos no Projeto

* Coloque o arquivo `GoogleService-Info.plist` que você baixou na **pasta raiz** do seu projeto local (a mesma pasta onde fica o `app.json`).
* Coloque o arquivo `google-services.json` que você baixou também na **pasta raiz** do projeto.

### 6. Instale as Dependências e Recompile

1.  Certifique-se de que todas as dependências do projeto estão instaladas:
    ```bash
    npm install
    # ou
    yarn install
    ```
2.  Como você adicionou arquivos de configuração nativa, pode ser necessário gerar um build de desenvolvimento para que o Expo os reconheça corretamente (o Expo Go pode não ser suficiente):
    ```bash
    # Crie e rode um build de desenvolvimento (substitui o Expo Go para este projeto)
    npx expo run:android
    # ou
    npx expo run:ios

    # Alternativamente, se usar EAS Build:
    # eas build --profile development --platform android (ou ios)
    # # Após o build, instale no dispositivo/emulador e rode com:
    # npx expo start --dev-client
    ```

Após seguir estes passos, seu ambiente de desenvolvimento local estará configurado para usar os serviços Firebase conectados ao *seu* projeto Firebase. Lembre-se que as **Regras de Segurança** do Firestore/Realtime Database/Storage são cruciais para proteger os dados.

---

## 📂 Project Structure

```plaintext
one-fin/
├── app/                   # Main app directory with file-based routing
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── _layout.tsx        # Root layout for the app
│   └── +not-found.tsx     # Custom 404 screen
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── constants/             # App-wide constants (e.g., colors)
├── styles/                # Global styles (Tailwind CSS)
├── scripts/               # Utility scripts (e.g., reset project)
├── assets/                # Static assets (images, fonts, etc.)
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

---

## ✨ Highlights

### 🌙 Dark Mode
One-Fin adapts to your system theme with a beautiful dark mode.

### 📊 Financial Overview
Get a quick snapshot of your **current balance**, **monthly income**, and **expenses**.

### 🖼️ Interactive Icons
Custom icons for accounts and cards using **Lucide React Native**.

---

## 🧪 Running Tests

Run the test suite with:

```bash
npm run test
```

Snapshot testing is used for UI components.

---

## 🛡️ Resetting the Project

To reset the project to a blank state, run:

```bash
npm run reset-project
```

This will move the starter code to the `app-example` directory and create a blank `app` directory.

---

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [NativeWind Documentation](https://www.nativewind.dev)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 💬 Contact

Have questions or feedback? Reach out to us:

- **Email**: filipeferibeiro@gmail.com
- **GitHub**: [filipeferibeiro](https://github.com/filipeferibeiro)


---

Made with ❤️ by Filipe Fernandes.