import { Plus } from "lucide-react-native";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";

interface NewTransactionTabBarButtonProps {
  onPress: (event: GestureResponderEvent) => void | undefined; // Função a ser chamada ao pressionar o botão
}

export function NewTransactionTabBarButton({ onPress }: NewTransactionTabBarButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.9} // Feedback visual ao pressionar
      className="-top-6 justify-center items-center" // Estilos para centralizar o botão
      onPress={onPress} // Usa o onPress fornecido pelas Tabs ou o customizado
    >
      <View
        className="w-[65] h-[65] rounded-full bg-blue-500 items-center justify-center shadow-md" // Estilos do botão
      >
        {/* Ícone dentro do botão central */}
        <Plus size={30} color="#FFF" />
      </View>
    </TouchableOpacity>
  );
}