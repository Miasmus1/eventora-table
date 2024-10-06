import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EventsProvider, useEvents } from './EventsContext';
import { useSearch } from '../features/search-field/useSearch';
import { useSearchParams } from 'react-router-dom';

vi.mock('../features/search-field/useSearch');
vi.mock('react-router-dom', () => ({
  useSearchParams: vi.fn(),
}));

const TestComponent = () => {
  const { events, setSearchTerm, searchTerm, isLoading, error } = useEvents();

  return (
    <div>
      <div data-testid="events">{JSON.stringify(events)}</div>
      <div data-testid="searchTerm">{searchTerm}</div>
      <div data-testid="isLoading">{isLoading.toString()}</div>
      <div data-testid="error">{error}</div>
      <button onClick={() => setSearchTerm('Basketball')}>Change Search Term</button>
    </div>
  );
};

describe('EventsContext', () => {
  beforeEach(() => {
    useSearch.mockReturnValue({ eventsResponse: null, isLoading: false, error: null });
    useSearchParams.mockReturnValue([{ get: () => '1' }, vi.fn()]);
  });

  it('should provide initial state', () => {
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    expect(screen.getByTestId('events').textContent).toBe('[]');
    expect(screen.getByTestId('searchTerm').textContent).toBe('Football');
    expect(screen.getByTestId('isLoading').textContent).toBe('false');
    expect(screen.getByTestId('error').textContent).toBe('');
  });

  it('should update events state', async () => {
    render(
      <EventsProvider>
        <TestComponent />
      </EventsProvider>
    );

    const buttons = screen.getAllByText('Change Search Term');
    fireEvent.click(buttons[0]);

    await waitFor(() => {
      const eventsElements = screen.getAllByTestId('events');
      expect(eventsElements[0].textContent).toBe('[]');
    });
  });
});
