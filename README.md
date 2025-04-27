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