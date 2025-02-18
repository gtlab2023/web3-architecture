// 定义钱包地址格式化的类型
export interface FormatWalletAddressOptions {
  prefixLength?: number; // 显示地址前缀的长度
  suffixLength?: number; // 显示地址后缀的长度
  separator?: string;    // 用于分隔显示前后缀的字符
}

// 格式化钱包地址的函数
export function formatWalletAddress(
  address: string,
  options: FormatWalletAddressOptions = {}
): string {
  const {
    prefixLength = 6,
    suffixLength = 4,
    separator = '...'
  } = options;

  // 检查地址长度是否足够
  if (address.length <= prefixLength + suffixLength) {
    return address;
  }

  // 获取前缀和后缀
  const prefix = address.substring(0, prefixLength);
  const suffix = address.substring(address.length - suffixLength);

  // 返回格式化后的地址
  return `${prefix}${separator}${suffix}`;
}

// 使用示例
const originalAddress = '0x1234567890abcdef1234567890abcdef12345678';
const formattedAddress = formatWalletAddress(originalAddress);
console.log(formattedAddress); // 输出: 0x123456...f12345678
