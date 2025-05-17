/**
 * 导航交互模块
 * 处理导航菜单交互、高亮等功能
 */
import { highlightCurrentNavItem } from "./animation.js";

/**
 * 设置导航菜单索引
 * 用于动画和CSS样式
 */
export function setupMenuIndexes() {
  $(".navigation a").each(function (index) {
    $(this).css("--menu-index", index + 1);
  });
}

/**
 * 设置菜单按钮点击事件
 * 控制移动端菜单的显示/隐藏
 */
export function setupMenuButtonEvents() {
  $(".menu-btn")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $navigation = $(".navigation");

      if ($navigation.hasClass("show")) {
        // 关闭菜单
        $navigation.addClass("closing");
        $(this).removeClass("active");

        // 等待动画完成
        setTimeout(function () {
          $navigation.removeClass("show closing");
          $("body").css("overflow", "");
        }, 400);
      } else {
        // 打开菜单
        $navigation.removeClass("closing").addClass("show");
        $(this).addClass("active");
        $("body").css("overflow", "hidden");
      }
    });
}

/**
 * 设置导航链接点击事件
 * 点击导航项后关闭移动端菜单
 */
export function setupNavLinkEvents() {
  $(".navigation a").on("click", function () {
    if ($(window).width() <= 768) {
      const $navigation = $(".navigation");
      const $menuBtn = $(".menu-btn");

      $navigation.addClass("closing");
      $menuBtn.removeClass("active");

      setTimeout(function () {
        $navigation.removeClass("show closing");
        $("body").css("overflow", "");
      }, 400);
    }
  });
}

/**
 * 设置页面点击事件
 * 点击页面其他区域时关闭菜单
 */
export function setupDocumentClickEvent() {
  $(document).on("click", function (e) {
    if (
      $(".navigation").hasClass("show") &&
      !$(e.target).closest(".navigation").length &&
      !$(e.target).closest(".menu-btn").length
    ) {
      const $navigation = $(".navigation");
      const $menuBtn = $(".menu-btn");

      $navigation.addClass("closing");
      $menuBtn.removeClass("active");

      setTimeout(function () {
        $navigation.removeClass("show closing");
        $("body").css("overflow", "");
      }, 400);
    }
  });
}

/**
 * 初始化导航功能
 * 集成所有导航相关的初始化
 */
export function initNavigation() {
  setupMenuIndexes();
  setupMenuButtonEvents();
  setupNavLinkEvents();
  setupDocumentClickEvent();
  highlightCurrentNavItem();
}
