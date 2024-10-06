import { describe, it, expect } from 'vitest';
import { getNestedProp } from './getNestedProp';

describe('getNestedProp', () => {
  it('should return the value of a deeply nested property', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = getNestedProp(obj, 'a.b.c');
    expect(result).toBe(42);
  });

  it('should return undefined for a non-existent property', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = getNestedProp(obj, 'a.b.d');
    expect(result).toBeUndefined();
  });

  it('should handle array indices in the path', () => {
    const obj = { a: [{ b: 42 }] };
    const result = getNestedProp(obj, 'a[0].b');
    expect(result).toBe(42);
  });

  it('should return undefined for a non-existent array index', () => {
    const obj = { a: [{ b: 42 }] };
    const result = getNestedProp(obj, 'a[1].b');
    expect(result).toBeUndefined();
  });

  it('should handle mixed object and array paths', () => {
    const obj = { a: [{ b: { c: 42 } }] };
    const result = getNestedProp(obj, 'a[0].b.c');
    expect(result).toBe(42);
  });

  it('should return the original object if the path is empty', () => {
    const obj = { a: 42 };
    const result = getNestedProp(obj, '');
    expect(result).toBe(obj);
  });

  it('should handle paths with empty segments', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = getNestedProp(obj, 'a..b.c');
    expect(result).toBe(42);
  });

  it('should handle paths with leading and trailing dots', () => {
    const obj = { a: { b: { c: 42 } } };
    const result = getNestedProp(obj, '.a.b.c.');
    expect(result).toBe(42);
  });
});
