/**
 * 事件处理模块
 * 管理各种全局事件监听器
 */
import { throttle } from "../utils.js";
import { initLazyLoading } from "../lazyload.js";
import { highlightCurrentNavItem } from "../animation.js";

/**
 * 设置滚动事件
 * 处理滚动时的懒加载
 */
export function setupScrollEvents() {
  const handleScroll = throttle(() => {
    initLazyLoading(true);
  }, 200);

  window.addEventListener("scroll", handleScroll);
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
    }, 150);
  });
}

/**
 * 设置hash变化事件
 * 处理锚点导航变化
 */
export function setupHashChangeEvents() {
  window.addEventListener("hashchange", highlightCurrentNavItem);
}

/**
 * 初始化所有事件处理
 */
export function initEvents() {
  setupScrollEvents();
  setupResizeEvents();
  setupHashChangeEvents();
}
