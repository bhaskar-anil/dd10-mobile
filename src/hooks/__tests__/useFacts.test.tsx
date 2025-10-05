import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFacts } from '../useFacts';
import * as newsService from '../../services/newsService';
import { ThemeProvider } from '../../context/ThemeContext';
import { Fact } from '../../services/newsService';

// ✅ Mock facts with full Fact type
const mockFacts: Fact[] = [
  { id: '1', content: 'Fact A', date: '2025-10-05' },
  { id: '2', content: 'Fact B', date: '2025-10-05' },
];

// ✅ Mock fetchFacts API
//jest.spyOn(newsService, 'fetchFacts').mockImplementation(async () => mockFacts);
jest.mock('../../services/newsService', () => ({
  fetchFacts: jest.fn(async () => [
    { id: '1', date: '2025-10-05', content: 'Fact 1' },
    { id: '2', date: '2025-10-05', content: 'Fact 2' },
  ]),
}));

describe('useFacts hook (modern RTL)', () => {
  it('loads facts on initialization', async () => {
    // Wrapper with ThemeProvider if your hook uses context
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useFacts(), { wrapper });

    await waitFor(() => !result.current.loading);
    expect(result.current.facts.length).toBeGreaterThan(0);

    // Initially loading
    expect(result.current.loading).toBe(true);

    // Wait for hook to finish fetching
    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.facts).toEqual(mockFacts);
    expect(result.current.error).toBeNull();
  });

  it('sets error if fetch fails', async () => {
    // Override mock to throw error
    (newsService.fetchFacts as jest.Mock).mockImplementationOnce(async () => {
      throw new Error('Network error');
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useFacts(), { wrapper });

    await waitFor(() => !result.current.loading);

    await waitFor(() => !result.current.loading);

    expect(result.current.loading).toBe(false);
    expect(result.current.facts).toEqual([]);
    expect(result.current.error).toBe('Failed to load news. Please try again later.');
  });
});
