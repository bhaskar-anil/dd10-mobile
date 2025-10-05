// src/components/FactsList.tsx
import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import FactCard from './FactCard';
import { Fact } from '../services/newsService';

type Props = {
  facts: Fact[];
  loading: boolean;
  error?: string | null;
};

export default function FactsList({ facts, loading, error }: Props) {
  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Fetching daily facts...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );

  if (facts.length === 0)
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No news found for this date.</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {facts.map((fact) => (
        <FactCard key={fact.id} title={fact.date} summary={fact.content} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorText: { color: 'red', fontSize: 16 },
  emptyText: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 40 },
});
