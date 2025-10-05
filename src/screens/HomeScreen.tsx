import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { fetchFacts, Fact } from '../services/newsService';

export default function HomeScreen() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

  async function loadFacts(date: string) {
    try {
      setLoading(true);
      setError(null);
      console.log('📅 Fetching facts for date:', date);
      const fetchedFacts = await fetchFacts(date, 'en');
      setFacts(fetchedFacts ?? []);
    } catch (err: any) {
      console.error('❌ Error loading facts:', err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFacts(formattedDate);
  }, [formattedDate]);

  const onDateChange = (_: any, pickedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (pickedDate) setSelectedDate(pickedDate);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerDate}>
          {selectedDate.toDateString()}
        </Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Loading */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Fetching daily facts...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {facts.length === 0 ? (
            <Text style={styles.emptyText}>No news found for this date.</Text>
          ) : (
            facts.map((fact) => (
              <View key={fact.id} style={styles.card}>
                <Text style={styles.date}>{fact.date}</Text>
                <Text style={styles.content}>{fact.content}</Text>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
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
  headerDate: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  content: {
    fontSize: 16,
    color: '#333',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
});
