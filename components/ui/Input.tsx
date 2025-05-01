import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from "react-native";

interface InputProps extends React.ComponentProps<typeof TextInput> {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  className?: string;
}

export function Input({
  label,
  placeholder,
  value,
  onChange,
  className,
  ...props
}: InputProps) {
  return (
    <View>
      <Text
        className={`ml-2 text-sm font-light text-gray-700 dark:text-gray-300 mb-1 uppercase tracking-wider`}
      >
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        placeholderTextColor={"#9ca3af"} // gray-400
        className={`w-full
            text-black dark:text-white
            py-3 px-4 rounded-lg
            border border-gray-300 dark:border-gray-600
            font-light
            text-base ${className}`}
        {...props}
      />
    </View>
  );
}