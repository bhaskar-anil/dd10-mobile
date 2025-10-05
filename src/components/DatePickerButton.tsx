// src/components/DatePickerButton.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = {
  date: Date;
  onDateChange: (date: Date) => void;
};

export default function DatePickerButton({ date, onDateChange }: Props) {
  const [show, setShow] = useState(false);

  const handleChange = (_: any, picked?: Date) => {
    setShow(Platform.OS === 'ios');
    if (picked) onDateChange(picked);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{ padding: 8, marginRight: 10 }}
      >
        <Ionicons name="calendar-outline" size={28} color="#000" />
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleChange}
        />
      )}
    </>
  );
}
