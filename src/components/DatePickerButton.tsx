import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/color';

interface Props {
  date: Date;
  onDateChange: (date: Date) => void;
}

export default function DatePickerButton({ date, onDateChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const { theme } = useTheme();
  const palette = colors[theme];

  const handleChange = (_: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Ionicons name="calendar-outline" size={26} color={palette.text} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={new Date()}
          textColor={palette.text} // iOS only
        />
      )}
    </>
  );
}
