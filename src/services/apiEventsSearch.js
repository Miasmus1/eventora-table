import { API_PAGE_SIZE } from '../constants';
import { tmURL, tmApiKey } from './ticketMaster';

export async function getEvents(searchTerm, page) {
  const response = await fetch(`${tmURL}/events/?keyword=${searchTerm}&size=${API_PAGE_SIZE}&page=${page}&${tmApiKey}`);

  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const responseData = await response.json();

  return responseData;
}
