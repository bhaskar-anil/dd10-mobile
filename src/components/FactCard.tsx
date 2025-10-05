import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme/color';

interface FactCardProps {
  title?: string | null;
  summary?: string | null;
}

export default function FactCard({ title, summary }: FactCardProps) {
  const { theme } = useTheme();
  const palette = colors[theme];

  return (
    <View style={[styles.card, { backgroundColor: palette.card }]}>
      {/* {title ? (
        <Text style={[styles.title, { color: palette.text }]} numberOfLines={1}>
          {title}
        </Text>
      ) : null} */}
      <Text style={[styles.summary, { color: palette.text }]} numberOfLines={3}>
        {summary}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
  },
  summary: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '400',
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
    }),
  },
});
