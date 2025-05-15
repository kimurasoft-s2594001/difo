// 防抖函数：事件被触发n秒后才执行，如果期间再次触发则重新计时
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
