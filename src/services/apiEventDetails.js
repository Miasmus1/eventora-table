import { tmURL, tmApiKey } from './ticketMaster';

export async function getEventDetails(eventId) {
  const response = await fetch(`${tmURL}/events/${eventId}?${tmApiKey}`);

  if (!response.ok) {
    throw new Error('Failed to fetch event details');
  }

  const responseData = await response.json();

  return responseData;
}
