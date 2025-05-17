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
import { initLazyLoading } from "../lazyload.js";

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
  $("section").each(function () {
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
  $("body").addClass(
    isComprehensiveMobileCheck() ? "mobile-device" : "desktop-device"
  );
}

/**
 * 初始化页面DOM元素
 * 集成所有DOM相关的初始化功能
 */
export function initDOM() {
  setupHeader();
  setupFooter();
  setupSideNav();
  setupDeviceClass();
  initLazyLoading(false);
}
