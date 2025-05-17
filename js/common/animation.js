import { throttle } from "./utils.js";
import { highlightCurrentNavItem as highlightNavItem } from "./nav-highlight.js";

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

/**
 * 高亮显示当前页面对应的导航菜单项
 * 调用nav-highlight.js中的实现
 */
function highlightCurrentNavItem() {
  // 使用统一的导航高亮实现
  highlightNavItem();
}

// 处理滚动动画
function handleScrollAnimations() {
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

// 处理导航高亮
function handleNavHighlight() {
  // 使用统一的导航高亮实现
  highlightNavItem();

  // 处理侧边导航高亮
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

// 初始化动画
function initAnimations() {
  // 初始调用一次，处理可见元素
  handleScrollAnimations();
  handleNavHighlight();
  
  // 移除了initNavAnimation的调用，因为其中的菜单按钮事件已在navigation.js中处理
  
  // 监听滚动事件
  window.addEventListener(
    "scroll",
    throttle(() => {
      handleScrollAnimations();
      handleNavHighlight();
    }, 100)
  );

  // 移除了菜单按钮点击和导航链接点击事件，避免与navigation.js中的事件处理冲突
}



export {
  handleScrollAnimations,
  handleNavHighlight,
  highlightCurrentNavItem,
  initAnimations
};
