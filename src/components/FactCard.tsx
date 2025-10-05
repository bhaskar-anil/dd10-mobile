import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function FactCard({ title, summary }: { title?:string|null, summary?:string|null }) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : null}
      <Text style={styles.summary} numberOfLines={3}>{summary}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 8,
    // subtle shadow - Android / iOS differences
    elevation: 1,
  },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 6 },
  summary: { fontSize: 13, lineHeight: 18, color: '#333' }
})
