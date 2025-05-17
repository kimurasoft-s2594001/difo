/**
 * 导航交互模块
 * 处理导航菜单交互、高亮等功能
 */
import { highlightCurrentNavItem } from "./nav-highlight.js";
import { setupMenuIndexes } from "./nav-highlight.js";

/**
 * 设置菜单按钮点击事件
 * 控制移动端菜单的显示/隐藏
 */
export function setupMenuButtonEvents() {
  $(".menu-btn")
    .off("click") // 移除所有点击事件，避免重复绑定
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $navigation = $(".navigation");
      const $menuBtn = $(this);

      if ($navigation.hasClass("show")) {
        // 关闭菜单
        $navigation.addClass("closing");
        $menuBtn.removeClass("active");
        // 更新无障碍属性
        $menuBtn.attr("aria-expanded", "false");

        // 等待动画完成
        setTimeout(function () {
          $navigation.removeClass("show closing");
          $("body").css("overflow", "");
        }, 400);
      } else {
        // 打开菜单
        $navigation.removeClass("closing").addClass("show");
        $menuBtn.addClass("active");
        // 更新无障碍属性
        $menuBtn.attr("aria-expanded", "true");
        $("body").css("overflow", "hidden");
        
        // 菜单打开后更新导航高亮
        setTimeout(highlightCurrentNavItem, 50);
      }
    });

  // 添加键盘导航支持
  $(".menu-btn").on("keydown", function(e) {
    // 回车或空格键
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      $(this).trigger("click");
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
