// src/components/__tests__/FactsList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FactsList from '../FactsList';
import { Fact } from '../../services/newsService';

const mockFacts: Fact[] = [
  { id: '1', content: 'Fact A', date: '2025-10-05' },
  { id: '2', content: 'Fact B', date: '2025-10-05' },
];

describe('FactsList', () => {
  it('renders loading state', () => {
    render(<FactsList facts={[]} loading={true} error={null} />);
    expect(screen.getByText(/Fetching daily facts/i)).toBeTruthy();
  });

  it('renders error state', () => {
    render(<FactsList facts={[]} loading={false} error="Network error" />);
    expect(screen.getByText(/Network error/i)).toBeTruthy();
  });

  it('renders empty state', () => {
    render(<FactsList facts={[]} loading={false} error={null} />);
    expect(screen.getByText(/No news found/i)).toBeTruthy();
  });

  it('renders list of facts', () => {
    render(<FactsList facts={mockFacts} loading={false} error={null} />);
    expect(screen.getByText('Fact A')).toBeTruthy();
    expect(screen.getByText('Fact B')).toBeTruthy();
  });
});
