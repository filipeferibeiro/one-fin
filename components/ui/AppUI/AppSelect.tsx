import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { TextInputProps } from "react-native";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "../select";
import { ChevronDown } from "lucide-react-native";
import { ISelectProps } from "@gluestack-ui/select/lib/types";

interface AppSelectProps extends ISelectProps {
  label: string;
  placeholder?: string;
  helperText?: string;
  items: SelectItemProps[];
}

export function AppSelect({ label, helperText, placeholder, items, ...props }: AppSelectProps) {
  return (
    <VStack space="xs">
      <Box className="flex-row items-center justify-between">
        <Text className="text-sm text-typography-500 uppercase tracking-wider">{label}</Text>
        <Text className="text-xs text-typography-500">{helperText}</Text>
      </Box>
      <Select
        {...props}
      >
        <SelectTrigger variant="outline" size="md" className="flex-row items-center justify-between">
          <SelectInput className="py-2" placeholder={placeholder} />
          <SelectIcon className="mr-3" as={ChevronDown} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>
            {items.map((item) => (
              <SelectItem key={item.value} label={item.label} value={item.value} />
            ))}
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  )
}