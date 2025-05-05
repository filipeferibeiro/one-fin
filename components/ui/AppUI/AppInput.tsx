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
        <Text className="text-typography-500">{label}</Text>
        <Text className="text-xs text-typography-500">{helperText}</Text>
      </Box>
      <Input
        variant="outline"
        size="xl"
      >
        <InputField
          {...props}
        />
      </Input>
    </VStack>
  )
}