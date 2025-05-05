import React, { useState, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    getDaysInMonth,
    getDay, // 0 = Sunday, 1 = Monday, ...
    getDate, // Day of the month
    isSameDay,
    isToday,
    setDate, // Sets the day of the month
} from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Import locale for Portuguese month names
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '../modal';
import { Button, ButtonText } from '../button';
import { Icon } from '../icon';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { Heading } from '../heading';
import { Text } from '../text';
import { Box } from '../box';

// Get screen width for calculating day cell size (optional)
const screenWidth = Dimensions.get('window').width;
const dayCellPadding = 4; // p-1 tailwind equivalent roughly
const dayCellMargin = 4; // m-1 tailwind equivalent roughly
// Calculate cell size to fit 7 days + margins/paddings within modal width (approx)
const approxModalWidth = screenWidth * 0.85; // Estimate modal width
const daySize = (approxModalWidth / 7) - (dayCellMargin * 2) - (dayCellPadding * 2) ;


interface DatePickerModalProps {
    isVisible: boolean;
    onClose: () => void;
    onDateSelected: (selectedDate: Date) => void;
    initialDate?: Date;
    // Add min/max date props if needed (requires more logic)
    // minimumDate?: Date;
    // maximumDate?: Date;
}

// Helper to generate calendar days for the month
const generateCalendarDays = (dateInMonth: Date, selected: Date | null) => {
    const start = startOfMonth(dateInMonth);
    const end = endOfMonth(dateInMonth);
    const daysInMonth = getDaysInMonth(dateInMonth);
    const startDayOfWeek = getDay(start); // 0 for Sunday

    const days = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startDayOfWeek; i++) {
        days.push({ key: `empty-${i}`, isEmpty: true });
    }

    // Add actual day cells
    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = setDate(start, day); // Create Date object for this specific day
        days.push({
            key: `day-${day}`,
            dayNumber: day,
            date: currentDate,
            isEmpty: false,
            isSelected: selected ? isSameDay(currentDate, selected) : false,
            isToday: isToday(currentDate),
        });
    }

    while ((days.length % 7) !== 0) {
      days.push({ key: `empty-end-${days.length}`, isEmpty: true });
    }

    const weeks = []
    
    for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
    }

    return weeks;
};

const DatePickerModal: React.FC<DatePickerModalProps> = ({
    isVisible,
    onClose,
    onDateSelected,
    initialDate = new Date(),
}) => {
    // State for the month/year currently displayed in the calendar
    const [displayDate, setDisplayDate] = useState<Date>(startOfMonth(initialDate));
    // State for the date temporarily selected by the user within the picker
    const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(initialDate);

    // Reset internal state when modal becomes visible or initialDate changes
    React.useEffect(() => {
        if (isVisible) {
            const startOfInitial = startOfMonth(initialDate);
            setDisplayDate(startOfInitial);
            setTempSelectedDate(initialDate);
        }
    }, [isVisible, initialDate]);

    function handleTodayButton() {
      const today = new Date();
      setDisplayDate(today);
      setTempSelectedDate(today);
    } 

    const handlePrevMonth = useCallback(() => {
        setDisplayDate((current) => subMonths(current, 1));
    }, []);

    const handleNextMonth = useCallback(() => {
        setDisplayDate((current) => addMonths(current, 1));
    }, []);

    const handleDayPress = useCallback((date: Date) => {
        setTempSelectedDate(date);
    }, []);

    const handleConfirm = useCallback(() => {
        if (tempSelectedDate) {
            onDateSelected(tempSelectedDate);
            onClose();
        }
        // Optional: Add handling if no date is selected but confirm is pressed
    }, [tempSelectedDate, onDateSelected, onClose]);

    // Generate the days for the current display month
    const calendarDays = useMemo(
        () => generateCalendarDays(displayDate, tempSelectedDate),
        [displayDate, tempSelectedDate]
    );

    const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Or use date-fns locale

    // Format month/year header using date-fns with locale
    const headerText = format(displayDate, 'MMMM yyyy', { locale: ptBR });

    return (
        <Modal isOpen={isVisible} onClose={onClose} finalFocusRef={undefined}>
            {/* Added finalFocusRef={undefined} to potentially avoid issues */}
            <ModalBackdrop />
            <ModalContent className="m-4 max-w-lg rounded-xl">
                <ModalHeader>
                    <View className="flex-row items-center justify-between w-full">
                        <TouchableOpacity onPress={handlePrevMonth} className="p-0 -ml-2">
                            <Icon as={ChevronLeft} size="xl" />
                        </TouchableOpacity>
                        {/* Capitalize first letter of month */}
                        <Heading size="lg">{headerText.charAt(0).toUpperCase() + headerText.slice(1)}</Heading>
                        <TouchableOpacity onPress={handleNextMonth} className="p-0 -mr-2">
                            <Icon as={ChevronRight} size="xl" />
                        </TouchableOpacity>
                    </View>
                </ModalHeader>

                <ModalBody className="p-2 sm:p-4">
                    {/* Weekday Headers */}
                    <View className="flex-row gap-1 mb-2">
                        {weekdays.map((day, i) => (
                            <Text key={i} className="flex-1 text-xs font-medium text-center text-gray-500" style={{ width: daySize }}>
                                {day}
                            </Text>
                        ))}
                    </View>

                    {/* Calendar Grid */}
                    {calendarDays.map((week, weekIndex) => (
                      <Box key={weekIndex} className="flex-row gap-1">
                        {week.map((dayInfo, dayIndex) => (
                          dayInfo.isEmpty ? (
                            <Box key={dayInfo.key} className="flex-1 w-[10] h-10" />
                          ) : (
                            <TouchableOpacity
                              key={dayInfo.key}
                              className={`
                                flex-1 w-[10] h-10 rounded-full items-center justify-center
                                ${dayInfo.isToday && !dayInfo.isSelected ? 'border border-primary-400' : ''}
                                ${dayInfo.isSelected ? 'bg-primary-600' : ''}
                              `}
                              onPress={() => handleDayPress(dayInfo.date as Date)}
                            >
                              <Text className={`
                                ${dayInfo.isSelected ? 'text-white dark:text-black font-bold' : ''}
                              `}>
                                {dayInfo.dayNumber}
                              </Text>
                            </TouchableOpacity>
                          )
                        ))}
                      </Box>
                    ))}
                </ModalBody>

                <ModalFooter>
                  <Box className="flex-1 flex-row items-start">
                    <Button
                        variant="link"
                        size="sm"
                        action="secondary"
                        onPress={handleTodayButton}
                        className="px-4"
                    >
                        <ButtonText>Today</ButtonText>
                    </Button>
                  </Box>
                  <Box className="flex-row gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        action="secondary"
                        onPress={onClose} // Directly use onClose from props
                    >
                        <ButtonText>Cancelar</ButtonText>
                    </Button>
                    <Button
                        size="sm"
                        action="primary"
                        onPress={handleConfirm}
                        // Disable confirm if no date is selected (optional)
                        // isDisabled={!tempSelectedDate}
                    >
                        <ButtonText>Confirmar</ButtonText>
                    </Button>
                  </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DatePickerModal;