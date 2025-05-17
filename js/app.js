/**
 * app.js - 核心应用模块
 *
 */

// 从各功能模块导入
import { companyInfo, urls } from "./common/config.js";
import { initLazyLoading } from "./common/lazyload.js";
import { throttle } from "./common/utils.js";
import { highlightCurrentNavItem } from "./common/nav-highlight.js";
import {
  setupHeader,
  setupFooter,
  setupSideNav,
  setupDeviceClass,
} from "./common/dom-manager.js";
import {
  setupMenuIndexes,
  setupMenuButtonEvents,
  setupNavLinkEvents,
  setupDocumentClickEvent,
} from "./common/navigation.js";

// 导出公司信息和URL（保持原有API兼容性）
export { companyInfo, urls };

/**
 * 页面加载前执行的函数
 * 初始化页面DOM结构
 */
export function loadBefore() {
  // 初始化页面DOM结构
  setupHeader();
  setupFooter();
  setupSideNav();
  setupDeviceClass();
  initLazyLoading(false);
}

/**
 * 页面加载后执行的函数
 * 初始化交互和事件
 */
export function loadAfter() {
  // 初始化导航
  setupMenuIndexes();
  setupMenuButtonEvents();
  setupNavLinkEvents();
  setupDocumentClickEvent();
  highlightCurrentNavItem();
  // 设置事件监听
  setupScrollEvents();
  setupResizeEvents();
  setupHashChangeEvents();
  // 显示页面内容
  $("body").addClass("show");
}

/**
 * 设置滚动事件
 */
function setupScrollEvents() {
  const handleScroll = throttle(() => {
    initLazyLoading(true);
  }, 200);

  window.addEventListener("scroll", handleScroll);
}

/**
 * 设置窗口大小变化事件
 */
function setupResizeEvents() {
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
 */
function setupHashChangeEvents() {
  window.addEventListener("hashchange", highlightCurrentNavItem);
}

// 导出常用功能以供直接使用
export { initLazyLoading, throttle, highlightCurrentNavItem };
