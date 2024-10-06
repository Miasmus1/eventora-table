import { tmApiKey, tmURL } from './ticketMaster';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getEventDetails } from './apiEventDetails';

describe('getEventDetails', () => {
  const mockEventId = '12345';
  const mockResponse = {
    id: mockEventId,
    name: 'Sample Event',
    date: '2023-10-01',
  };

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch event details successfully', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getEventDetails(mockEventId);

    expect(global.fetch).toHaveBeenCalledWith(`${tmURL}/events/${mockEventId}?${tmApiKey}`);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the fetch fails', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getEventDetails(mockEventId)).rejects.toThrow('Failed to fetch event details');
  });
});
