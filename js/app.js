/**
 * app.js - 核心应用模块
 *
 */

// 从各功能模块导入
import { companyInfo, urls } from "./common/config.js";
import { initDOM, reinitDOM } from "./common/dom-manager.js";
import { initLazyLoading } from "./common/lazyload.js";
import { throttle } from "./common/utils.js";
import { highlightCurrentNavItem } from "./common/nav-highlight.js";
import { triggerFadeAnimations } from "./common/animation.js";
import { initEvents } from "./common/event-handlers.js";
import { newsUtils } from "./common/news-data.js";

// 导出公司信息和URL（保持原有API兼容性）
export { companyInfo, urls, newsUtils };

/**
 * 页面加载前执行的函数
 * 初始化页面DOM结构
 */
export function loadBefore() {
  // 初始化页面DOM结构
  initDOM();
}

// 更新app.js中loadAfter函数
/**
 * 页面加载后执行的函数
 * 初始化交互和事件
 */
export function loadAfter() {
  // 显示页面内容
  $("body").addClass("show");
  
  // 触发滚动动画 - 立即显示所有内容
  setTimeout(() => {
    triggerFadeAnimations();
  }, 50); // 缩短时间以避免闪烁
}

// 导出常用功能以供直接使用
export { initLazyLoading, throttle, highlightCurrentNavItem, initDOM, reinitDOM, initEvents, triggerFadeAnimations };
