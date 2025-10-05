// src/screens/HomeScreen.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useFacts } from '../hooks/useFacts';
import DatePickerButton from '../components/DatePickerButton';
import FactsList from '../components/FactsList';

export default function HomeScreen() {
  const { facts, loading, error, selectedDate, setSelectedDate } = useFacts();

  if (!selectedDate) {
    return (
      <View style={styles.centered}>
        <Text>Initializing...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      <View style={styles.header}>
        <Text style={styles.headerDate}>{selectedDate.toDateString()}</Text>
        <DatePickerButton date={selectedDate} onDateChange={setSelectedDate} />
      </View>

      <FactsList facts={facts} loading={loading} error={error} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerDate: { fontSize: 18, fontWeight: '600', color: '#333' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
