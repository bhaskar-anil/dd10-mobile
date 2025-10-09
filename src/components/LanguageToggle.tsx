import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LanguageContext } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/color';

export const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { theme } = useTheme();
  const palette = colors[theme];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: palette.card,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 16,
      }}
    >
      <Text style={{ fontSize: 14, color: palette.text, fontWeight: '500' }}>
        {language === 'en' ? 'हिन्दी' : 'EN'}
      </Text>
    </TouchableOpacity>
  );
};
