// src/components/__tests__/FactCard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import FactCard from '../FactCard';

describe('FactCard', () => {
  it('renders content correctly', () => {
    render(<FactCard title="Fact Title" summary="Fact Summary" />);
    expect(screen.getByText('Fact Title')).toBeTruthy();
    expect(screen.getByText('Fact Summary')).toBeTruthy();
  });

  it('renders without title', () => {
    render(<FactCard summary="Only Summary" />);
    expect(screen.queryByText('Only Summary')).toBeTruthy();
    expect(screen.queryByText('Fact Title')).toBeNull();
  });
});
