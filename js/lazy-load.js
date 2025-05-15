export function initLazyLoading() {
  if ("loading" in HTMLImageElement.prototype) {
    // 浏览器支持原生懒加载
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // 浏览器不支持原生懒加载，使用Intersection Observer
    const images = document.querySelectorAll("img[data-src]");
    const config = {
      rootMargin: "0px 0px 50px 0px",
      threshold: 0,
    };

    if (!("IntersectionObserver" in window)) {
      // 不支持Intersection Observer，直接加载所有图片
      images.forEach((image) => {
        if (image.dataset.src) {
          image.src = image.dataset.src;
        }
      });
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    }, config);

    images.forEach((image) => {
      observer.observe(image);
    });
  }
}
