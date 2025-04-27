// components/ProgressBar.tsx
import React from 'react';
import { View, Text } from 'react-native';

interface ProgressBarProps {
  /** O progresso atual, um número entre 0 e 100. */
  progress: number;
  /** Classe de cor do Tailwind para a barra de progresso (ex: 'bg-blue-500'). */
  barColor?: string;
  /** Classe de cor do Tailwind para o fundo/trilha da barra (ex: 'bg-gray-200 dark:bg-gray-700'). */
  trackColor?: string;
  /** Classe de altura do Tailwind para a barra (ex: 'h-2', 'h-3'). */
  heightClass?: string;
  /** Se deve mostrar a porcentagem como texto sobreposto ou próximo. */
  showPercentage?: boolean;
  /** Estilo do texto da porcentagem (opcional) */
  percentageTextStyle?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  barColor = 'bg-blue-500', // Cor padrão da barra
  trackColor = 'bg-gray-200 dark:bg-gray-700', // Cor padrão do fundo (com suporte a dark mode)
  heightClass = 'h-2', // Altura padrão
  showPercentage = false,
  percentageTextStyle = 'text-xs text-white font-bold text-center'
}) => {
  // Garante que o progresso esteja entre 0 e 100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View className="relative w-full">
      {/* View Externa (Fundo/Trilha) */}
      <View
        className={`w-full ${trackColor} ${heightClass} rounded-full overflow-hidden`}
        // Props de acessibilidade
        accessible={true}
        accessibilityLabel="Barra de progresso"
        accessibilityValue={{ min: 0, max: 100, now: clampedProgress }}
      >
        {/* View Interna (Progresso Real) */}
        <View
          className={`${barColor} ${heightClass} rounded-full`}
          // Estilo inline para definir a largura dinamicamente
          style={{ width: `${clampedProgress}%` }}
        />
      </View>

      {/* Texto da Porcentagem (Opcional) */}
      {showPercentage && (
         // Posiciona o texto absolutamente no centro vertical da barra
         // Nota: Posicionamento absoluto pode precisar de ajustes finos dependendo da altura da barra (heightClass)
        <View className={`absolute inset-0 flex-row justify-center items-center ${heightClass}`} style={{ top: -0.5 }}>
           {/* Garante que o texto só apareça se houver espaço */}
           {clampedProgress > 10 && ( // Exemplo: só mostra se progresso > 10%
                <Text
                    className={`${percentageTextStyle} leading-none`} // leading-none ajuda no alinhamento vertical
                    style={{ lineHeight: undefined }} // Reset específico para RN se necessário
                >
                   {clampedProgress.toFixed(0)}%
                </Text>
           )}
        </View>
      )}
    </View>
  );
};

export default ProgressBar;