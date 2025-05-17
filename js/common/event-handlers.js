/**
 * 事件处理模块
 * 管理各种全局事件监听器
 */
import { throttle } from "./utils.js";
import { initLazyLoading } from "./lazyload.js";
import { highlightCurrentNavItem } from "./nav-highlight.js";
import { handleScrollAnimations, handleSideNavHighlight } from "./animation.js";

// 存储滚动事件处理的状态
// 增加标志防止重复初始化
let scrollHandlerInitialized = false;

/**
 * 设置统一的滚动事件处理
 * 通过一个事件处理器管理所有滚动相关功能
 */
export function setupScrollEvents() {
  if (scrollHandlerInitialized) return;
  
  const handleScroll = throttle(() => {
    // 处理懒加载
    initLazyLoading(true);
    
    // 处理滚动动画
    handleScrollAnimations();
    
    // 处理导航高亮
    highlightCurrentNavItem();
    
    // 处理侧边导航高亮
    handleSideNavHighlight();
  }, 150);

  window.addEventListener("scroll", handleScroll);
  scrollHandlerInitialized = true;
  
  // 初始调用一次，处理初始状态
  handleScroll();
}

/**
 * 设置窗口大小变化事件
 * 处理响应式布局调整
 */
export function setupResizeEvents() {
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      if ($(window).width() > 768) {
        $(".navigation").removeClass("show closing");
        $(".menu-btn").removeClass("active");
        $("body").css("overflow", "");
      }
      
      // 重新调用滚动事件处理，更新界面
      handleScrollAnimations();
      initLazyLoading(true);
    }, 150);
  });
}

/**
 * 设置hash变化事件
 * 处理锚点导航变化
 */
export function setupHashChangeEvents() {
  window.addEventListener("hashchange", () => {
    // 调用导航高亮函数
    highlightCurrentNavItem();
    // 更新侧边导航高亮
    handleSideNavHighlight();
  });
}

/**
 * 初始化所有事件处理
 */
export function initEvents() {
  setupScrollEvents();
  setupResizeEvents();
  setupHashChangeEvents();
}
