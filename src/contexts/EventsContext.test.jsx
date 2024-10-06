import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventsProvider, useEvents } from './EventsContext';
import { useSearch } from '../features/search-field/useSearch';
import { useSearchParams } from 'react-router-dom';

vi.mock('../features/search-field/useSearch');
vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

const TestComponent = () => {
  const { events, searchTerm, isLoading, error } = useEvents();
  const [_, setSearchParams] = useSearchParams();

  return (
    <div>
      <div data-testid="events">{JSON.stringify(events)}</div>
      <div data-testid="searchTerm">{searchTerm}</div>
      <div data-testid="isLoading">{isLoading.toString()}</div>
      <div data-testid="error">{error}</div>
      <button onClick={() => setSearchParams({ search: 'Basketball', page: 1 })}>Change Search Term</button>
    </div>
  );
};

describe('EventsContext', () => {
  let mockSetSearchParams;

  beforeEach(() => {
    useSearch.mockReturnValue({ eventsResponse: null, isLoading: false, error: null });
    mockSetSearchParams = vi.fn();
    useSearchParams.mockReturnValue([new URLSearchParams({ search: 'Football', page: '1' }), mockSetSearchParams]);
  });

  it('should provide initial state', () => {
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    expect(screen.getByTestId('events').textContent).toBe('[]');
    const searchTerm = screen.getByTestId('searchTerm').textContent;
    expect(['Football', '1']).toContain(searchTerm);
    expect(screen.getByTestId('isLoading').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('');
  });
});
