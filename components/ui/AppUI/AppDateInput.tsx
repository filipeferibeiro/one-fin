import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Platform, TouchableOpacity } from "react-native";
import { CalendarDays } from "lucide-react-native";
import { useIconColor } from "@/hooks/useIconColor";
import { useState } from "react";
import DatePickerModal from "./DatePickerModal";

interface AppDateInputProps {
  label: string;
  value?: Date;
  helperText?: string;
  onChange: (date: Date) => void;
}

export function AppDateInput({ label, helperText, value, onChange }: AppDateInputProps) {
  const { iconColor } = useIconColor();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = value ? value.toLocaleDateString() : ''; // Formato: MM/DD/YYYY
  const pickerMode = Platform.OS === 'ios' ? 'spinner' : 'default'; // Modo do DateTimePicker
  const isIOS = Platform.OS === 'ios';

  // const onChangeDate = (output: SingleOutput) => {
  //   onChange(null, output.date)
  // };

  const colorOptions = {
    headerColor:'#9DD9D2',
    backgroundColor:'#FFF8F0'
  }

  return (
    <VStack space="xs">
      <Box className="flex-row items-center justify-between">
        <Text className="text-sm text-typography-500 uppercase tracking-wider">{label}</Text>
        <Text className="text-xs text-typography-500">{helperText}</Text>
      </Box>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Box className="h-10 rounded border border-background-300 flex-row items-center px-3">
          <Text className="flex-1 text-typography-900 py-0">{formatDate}</Text>
          <CalendarDays size={20} color={iconColor} />
        </Box>
      </TouchableOpacity>
      <DatePickerModal
        isVisible={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onDateSelected={onChange}
        initialDate={value}
      />
    </VStack>
  )
}