// src/hooks/useFacts.ts
import { useEffect, useState } from 'react';
import { fetchFacts, Fact } from '../services/newsService';
import { loadDate, saveDate } from '../utils/storage';

export function useFacts() {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    (async () => {
      const saved = await loadDate();
      setSelectedDate(saved || new Date());
    })();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    const formatted = selectedDate.toISOString().split('T')[0];

    (async () => {
      try {
        setLoading(true);
        const fetched = await fetchFacts(formatted, 'en');
        setFacts(fetched);
        setError(null);
        await saveDate(selectedDate);
      } catch (e: any) {
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedDate]);

  return { facts, loading, error, selectedDate, setSelectedDate };
}
