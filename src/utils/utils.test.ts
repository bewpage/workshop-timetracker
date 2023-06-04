import { formatTime } from './utils';

describe('formatTime', () => {
  test('should format time', () => {
    expect(formatTime(100)).toBe('1h 40m');
    expect(formatTime(60)).toBe('1h 0m');
    expect(formatTime(40)).toBe(' 40m');
  });
});
