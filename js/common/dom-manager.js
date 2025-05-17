/**
 * DOM管理模块
 * 负责初始化和管理页面DOM元素
 */
import {
  getHeaderTemplate,
  getFooterTemplate,
  getSideNavButtonTemplate,
} from "./templates.js";
import { isComprehensiveMobileCheck } from "./device-utils.js";
import { initLazyLoading } from "./lazyload.js";
import { initEvents } from "./event-handlers.js";
import { initNavigation } from "./navigation.js";
import { setupErrorHandling } from "./error-handler.js";

// 跟踪初始化状态
let domInitialized = false;

/**
 * 初始化页面头部
 */
export function setupHeader() {
  $("#header").html(getHeaderTemplate());
}

/**
 * 初始化页面底部
 */
export function setupFooter() {
  $("#footer").html(getFooterTemplate());
}

/**
 * 初始化侧边导航
 * 为每个section创建导航点
 */
export function setupSideNav() {
  const sideNaviTag = $("#side-navi");
  if (sideNaviTag.length === 0) return;
  
  // 清除现有导航项
  sideNaviTag.empty();
  
  $("section").each(function () {
    if (!this.id) return; // 跳过没有ID的section
    
    sideNaviTag.append(
      $("<a />")
        .attr("href", "#" + this.id)
        .append(getSideNavButtonTemplate())
    );
  });
}

/**
 * 添加设备类型标识
 * 根据设备类型在body上添加对应的类名
 */
export function setupDeviceClass() {
  // 移除现有设备类型类名
  $("body").removeClass("mobile-device desktop-device");
  
  // 添加新的设备类型类名
  $("body").addClass(
    isComprehensiveMobileCheck() ? "mobile-device" : "desktop-device"
  );
}

/**
 * 初始化页面DOM元素
 * 集成所有DOM相关的初始化功能
 */
export function initDOM() {
  // 防止重复初始化
  if (domInitialized) {
    console.log("DOM already initialized, skipping duplicate initialization");
    return;
  }
  
  // 设置错误处理
  setupErrorHandling();
  
  // 初始化DOM结构
  setupHeader();
  setupFooter();
  setupSideNav();
  setupDeviceClass();
  
  // 初始化懒加载
  initLazyLoading(false);
  
  // 初始化导航
  initNavigation();
  
  // 初始化事件处理
  initEvents();
  
  // 标记为已初始化
  domInitialized = true;
  console.log("DOM initialization complete");
}

/**
 * 重新初始化DOM
 * 用于在页面动态变化后更新DOM
 */
export function reinitDOM() {
  domInitialized = false;
  initDOM();
}
