// <!-- 关键图片，立即加载 -->
// <img src="img/logo.png" alt="Logo" loading="eager">
// <!-- 普通图片，自动懒加载 -->
// <img src="img/content.jpg" alt="Content">
// <!-- 优先级低的大图，使用data-src更精细控制 -->
// <img data-src="img/large-banner.jpg" alt="Banner" src="img/placeholder.svg"></img>
/**
 * 初始化懒加载图片
 * @param {boolean} incrementalOnly 是否只处理新增的图片
 */
export function initLazyLoading(incrementalOnly = false) {
  // 检查是否支持原生懒加载
  if ("loading" in HTMLImageElement.prototype) {
    // 浏览器支持原生懒加载，为所有图片添加loading="lazy"属性
    const selector = incrementalOnly
      ? "img:not([loading]):not([data-lazy-initialized])"
      : "img:not([loading])";

    const images = document.querySelectorAll(selector);
    images.forEach((img) => {
      img.setAttribute("loading", "lazy");
      // 标记为已初始化
      img.setAttribute("data-lazy-initialized", "true");
    });
  } else {
    // 浏览器不支持原生懒加载，使用Intersection Observer实现
    if (!("IntersectionObserver" in window)) {
      // 不支持Intersection Observer，直接处理图片
      return;
    }

    // 如果还未创建observer对象，则创建一个
    if (!window.lazyLoadObserver) {
      window.lazyLoadObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // 如果有data-src属性，则设置src
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
              }
              img.setAttribute("data-lazy-initialized", "true");
              observer.unobserve(img);
            }
          });
        }
      );
    }

    // 观察所有未初始化的图片
    const selector = incrementalOnly
      ? "img[data-src]:not([data-lazy-initialized])"
      : "img[data-src], img:not([loading]):not([data-lazy-initialized])";

    const lazyImages = document.querySelectorAll(selector);
    lazyImages.forEach((img) => {
      // 如果没有data-src属性但有src属性，先保存原始src
      if (
        !img.dataset.src &&
        img.src &&
        !img.hasAttribute("data-lazy-initialized")
      ) {
        img.dataset.src = img.src;
      }
      img.setAttribute("data-lazy-initialized", "true");
      window.lazyLoadObserver.observe(img);
    });
  }
}
