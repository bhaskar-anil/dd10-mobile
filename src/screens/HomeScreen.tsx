import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchFacts, Fact } from '../services/newsService';

export default function HomeScreen() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  useEffect(() => {
    async function loadFacts() {
      try {
        console.log('home screen is starting...');
        setLoading(true);
        const fetchedFacts = await fetchFacts(today, 'en');
        setFacts(fetchedFacts ?? []);
      } catch (err: any) {
        console.error('Error loading facts:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadFacts();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Fetching daily facts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {facts.length === 0 ? (
        <Text style={styles.emptyText}>No news found for today.</Text>
      ) : (
        facts.map((fact) => (
          <View key={fact.id} style={styles.card}>
            <Text style={styles.date}>{fact.date}</Text>
            <Text style={styles.content}>{fact.content}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
