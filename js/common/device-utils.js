/**
 * 设备检测工具模块
 * 提供设备类型检测相关功能
 */

/**
 * 全面检测当前设备是否为移动设备
 * 综合考虑User Agent、触摸支持和屏幕尺寸
 * @returns {boolean} 如果是移动设备则返回 true
 */
export function isComprehensiveMobileCheck() {
  const userAgent = navigator.userAgent || window.opera;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const hasTouchSupport =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;
  const hasSmallScreen = window.innerWidth < 768;

  return mobileRegex.test(userAgent) || (hasTouchSupport && hasSmallScreen);
}
