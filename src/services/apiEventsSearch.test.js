import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getEvents } from './apiEventsSearch';
import { tmURL, tmApiKey } from './ticketMaster';
import { API_PAGE_SIZE } from '../constants';

describe('getEvents', () => {
  const searchTerm = 'concert';
  const page = 1;
  const mockResponse = {
    events: [
      { id: '1', name: 'Concert 1' },
      { id: '2', name: 'Concert 2' },
    ],
  };

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('should fetch events successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getEvents(searchTerm, page);

    expect(global.fetch).toHaveBeenCalledWith(
      `${tmURL}/events/?keyword=${searchTerm}&size=${API_PAGE_SIZE}&page=${page}&${tmApiKey}`
    );
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getEvents(searchTerm, page)).rejects.toThrow('Failed to fetch events');
  });
});
