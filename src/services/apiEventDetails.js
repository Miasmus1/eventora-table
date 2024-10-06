import { tmURL, tmApiKey } from './ticketMaster';

export async function getEventDetails(eventId) {
  const response = await fetch(`${tmURL}/events/${eventId}?${tmApiKey}`);

  if (response.status === 404) {
    throw new Error('No event has been found!');
  }

  if (!response.ok) {
    throw new Error('Failed to fetch event details');
  }

  const responseData = await response.json();

  return responseData;
}
