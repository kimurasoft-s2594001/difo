import { highlightCurrentNavItem } from "./nav-highlight.js";

/**
 * 手动触发滚动动画检测
 * 立即调用一次以显示可见内容
 */
export function triggerFadeAnimations() {
  // 直接将所有fade-in元素设置为可见，而不依赖于滚动位置
  // 在初始化时确保页面内容全部可见
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    element.classList.add("visible");
  });

  // 延迟再次调用，防止可能的渲染问题
  setTimeout(() => {
    // 再次确保所有元素可见
    const allFadeElements = document.querySelectorAll(".fade-in");
    allFadeElements.forEach((element) => {
      element.classList.add("visible");
    });

    // 这里不再调用handleScrollAnimations()，而是直接设置所有元素为可见
    // 避免因为滚动计算错误导致部分元素不可见
  }, 300);
}

// 处理滚动动画
export function handleScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    // 调整可见性阈值，使元素更容易被视为可见
    const elementVisible = windowHeight * 0.25; // 当元素进入可见区域的25%时显示

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// 处理侧边导航高亮
export function handleSideNavHighlight() {
  const currentHash = window.location.hash;
  const sideLinks = document.querySelectorAll(".side-navi a");

  // 移除所有侧边导航的高亮
  sideLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // 根据hash设置侧边导航高亮
  if (currentHash) {
    sideLinks.forEach((link) => {
      if (link.getAttribute("href") === currentHash) {
        link.classList.add("active");
      }
    });
  }
}
