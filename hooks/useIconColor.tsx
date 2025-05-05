import { useIsDarkMode } from "./useIsDarkMode";

export function useIconColor() {
  const isDarkMode = useIsDarkMode(); // Hook para verificar o tema atual
  const iconColor = isDarkMode ? '#FFF' : '#000'; // Define a cor do ícone com base no tema

  const iconColorInverted = isDarkMode ? '#000' : '#FFF'; // Cor do ícone invertida para o tema

  return { iconColor, iconColorInverted }; // Retorna a cor do ícone
}