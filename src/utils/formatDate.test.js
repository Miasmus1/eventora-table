import { describe, it, expect } from 'vitest';
import formatDate from './formatDate';

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    const date = '2023-10-01';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('10/1/2023'); // Adjust the expected format based on your locale
  });

  it('should format a Date object correctly', () => {
    const date = new Date('2023-10-01');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('10/1/2023'); // Adjust the expected format based on your locale
  });

  it('should handle invalid date input gracefully', () => {
    const date = 'invalid-date';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Invalid Date'); // Adjust based on how you want to handle invalid dates
  });

  it('should handle empty date input gracefully', () => {
    const date = '';
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Invalid Date'); // Adjust based on how you want to handle empty dates
  });

  it('should handle null date input gracefully', () => {
    const date = null;
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Invalid Date'); // Adjust based on how you want to handle null dates
  });

  it('should handle undefined date input gracefully', () => {
    const date = undefined;
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Invalid Date'); // Adjust based on how you want to handle undefined dates
  });
});
