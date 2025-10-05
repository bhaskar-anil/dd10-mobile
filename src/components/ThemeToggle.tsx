import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/color';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const palette = colors[theme];

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ paddingHorizontal: 8 }}>
      <Ionicons
        name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
        size={26}
        color={palette.text}
      />
    </TouchableOpacity>
  );
}
