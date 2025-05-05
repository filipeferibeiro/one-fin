import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Platform, TextInputProps, TouchableOpacity } from "react-native";
import { CalendarDays } from "lucide-react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useIconColor } from "@/hooks/useIconColor";
import { useState } from "react";

interface AppDateInputProps {
  label: string;
  value?: Date;
  helperText?: string;
  onChange?: (event: DateTimePickerEvent, date?: Date) => void;
}

export function AppDateInput({ label, helperText, value, onChange }: AppDateInputProps) {
  const { iconColor } = useIconColor();

  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = value ? value.toLocaleDateString() : ''; // Formato: MM/DD/YYYY

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
      const currentDate = selectedDate || value;
      setShowDatePicker(Platform.OS === 'ios'); // Esconde no iOS após seleção
      onChange && onChange(event, currentDate);
    };

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
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
          style={{
            width: 300,
          }}
        />
      )}
    </VStack>
  )
}