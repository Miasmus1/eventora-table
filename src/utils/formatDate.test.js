// NOTE: This test is written for "formatDate.js". Since that function uses "undefined" value in .toLocaleDateString(undefined) method, it will use the system's selected locale. This means the expected output will vary for users from different locales. My system locale is "en-US" so the expected output is "10/1/2023". If you are from a different locale, you need to adjust the expected date format accordingly. For example, for "tr-TR" locale, the expected output will be "01.10.2023".

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
