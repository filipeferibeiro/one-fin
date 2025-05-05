import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { TextInputProps } from "react-native";

interface AppInputProps extends TextInputProps {
  label: string;
  helperText?: string;
}

export function AppInput({ label, helperText, ...props }: AppInputProps) {
  return (
    <VStack space="xs">
      <Box className="flex-row items-center justify-between">
        <Text className="text-sm text-typography-500 uppercase tracking-wider">{label}</Text>
        <Text className="text-xs text-typography-500">{helperText}</Text>
      </Box>
      <Input
        variant="outline"
        size="md"
      >
        <InputField
          {...props}
        />
      </Input>
    </VStack>
  )
}