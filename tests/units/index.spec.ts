import { formatWalletAddress } from '@utils/index';

describe('formatWalletAddress', () => {
  test('formats address correctly with default parameters', () => {
    const address = '0x1234567890123456789012345678901234567890';
    expect(formatWalletAddress(address)).toBe('0x123456...7890');
  });

  test('formats address correctly with custom parameters', () => {
    const address = '0x1234567890123456789012345678901234567890';
    expect(formatWalletAddress(address, 4, 6)).toBe('0x1234...567890');
  });

  test('returns empty string for null or undefined address', () => {
    expect(formatWalletAddress('')).toBe('');
    expect(formatWalletAddress(null)).toBe('');
    expect(formatWalletAddress(undefined)).toBe('');
  });

  test('returns full address if it\'s shorter than start + end length', () => {
    const shortAddress = '0x1234567890';
    expect(formatWalletAddress(shortAddress)).toBe('0x1234567890');
  });

  test('handles addresses without 0x prefix', () => {
    const address = '1234567890123456789012345678901234567890';
    expect(formatWalletAddress(address)).toBe('123456...7890');
  });
});


