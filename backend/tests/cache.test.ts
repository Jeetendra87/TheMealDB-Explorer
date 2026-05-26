import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { MemoryCache } from '../src/cache/memoryCache.js';

describe('MemoryCache', () => {
  it('stores and retrieves values before ttl expiry', () => {
    const cache = new MemoryCache(10);

    cache.set('meal:1', { id: '1' }, 60);
    expect(cache.get('meal:1')).toEqual({ id: '1' });
  });

  it('evicts oldest entries when max size is exceeded', () => {
    const cache = new MemoryCache(2);

    cache.set('a', 1, 60);
    cache.set('b', 2, 60);
    cache.set('c', 3, 60);

    expect(cache.get('a')).toBeNull();
    expect(cache.get('b')).toEqual(2);
    expect(cache.get('c')).toEqual(3);
  });

  it('expires stale entries during cleanup', () => {
    jest.useFakeTimers();
    const cache = new MemoryCache(10);

    cache.set('stale', 'value', 1);
    jest.advanceTimersByTime(1100);

    expect(cache.get('stale')).toBeNull();
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
});
