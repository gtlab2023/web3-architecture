import { formatWalletAddress,FormatWalletAddressOptions } from '../../src/utils/index.ts'; // 确保路径正确

describe('formatWalletAddress', () => {
  it('should format the address with default options', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const formatted = formatWalletAddress(address);
    expect(formatted).toBe('0x123456...f12345678');
  });

  it('should format the address with custom options', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678';
    const options: FormatWalletAddressOptions = {
      prefixLength: 8,
      suffixLength: 6,
      separator: '****'
    };
    const formatted = formatWalletAddress(address, options);
    expect(formatted).toBe('0x12345678****f123456');
  });

  it('should return the original address if it is too short', () => {
    const address = '0x1234';
    const formatted = formatWalletAddress(address);
    expect(formatted).toBe(address);
  });

  it('should handle empty address', () => {
    const address = '';
    const formatted = formatWalletAddress(address);
    expect(formatted).toBe('');
  });

  // 添加更多的测试用例来覆盖不同的边界情况和错误处理
});
