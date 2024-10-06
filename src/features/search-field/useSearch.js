import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../services/apiEventsSearch';

export function useSearch({ searchTerm, page }) {
  const {
    data: eventsResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['events', searchTerm, page],
    queryFn: () => getEvents(searchTerm, page),
  });

  return { eventsResponse, isLoading, error };
}
