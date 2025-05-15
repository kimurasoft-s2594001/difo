/**
 * 防抖函数：事件被触发n秒后才执行，如果期间再次触发则重新计时
 * 注意：目前未在项目中使用，保留用于可能的未来需求
 * @param {Function} func 需要执行的函数
 * @param {number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖处理后的函数
 */
export function debounce(func, delay = 300) {
  let timer = null;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// 节流函数：规定时间内只执行一次
export function throttle(func, delay = 300) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) return;
    lastCall = now;
    func.apply(this, args);
  };
}
