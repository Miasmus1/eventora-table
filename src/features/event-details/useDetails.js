import { useQuery } from '@tanstack/react-query';
import { getEventDetails } from '../../services/apiEventDetails';

export function useDetails(eventId) {
  const {
    data: eventDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['eventDetails', eventId],
    queryFn: () => getEventDetails(eventId),
  });

  return { eventDetails, isLoading, error };
}
