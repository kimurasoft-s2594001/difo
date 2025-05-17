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
  initNavAnimation();

  // 监听滚动事件
  window.addEventListener(
    "scroll",
    throttle(() => {
      handleScrollAnimations();
      handleNavHighlight();
    }, 100)
  );

  // 处理菜单按钮点击
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".navigation");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("show");
      menuBtn.classList.toggle("active");
    });

    // 点击导航链接时关闭菜单
    document.querySelectorAll(".navigation a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("show");
        menuBtn.classList.remove("active");
      });
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-btn") && !e.target.closest(".navigation")) {
        nav.classList.remove("show");
        menuBtn.classList.remove("active");
      }
    });
  }
}

/**
 * 初始化导航菜单动画
 */
function initNavAnimation() {
  // 为导航菜单项设置索引（用于级联动画）
  $(".navigation a").each(function (index) {
    $(this).css("--menu-index", index + 1);
  });

  // 修改现有菜单按钮点击事件处理
  $(".menu-btn")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const $navigation = $(".navigation");
      const $menuBtn = $(this);

      if ($navigation.hasClass("show")) {
        // 关闭菜单（添加动画）
        $navigation.addClass("closing");
        $menuBtn.removeClass("active");

        // 等待动画完成后移除类
        setTimeout(function () {
          $navigation.removeClass("show closing");
          $("body").css("overflow", "");
        }, 400);
      } else {
        // 打开菜单
        $navigation.removeClass("closing").addClass("show");
        $menuBtn.addClass("active");
        $("body").css("overflow", "hidden");
      }
    });

  // 点击导航链接后直接关闭菜单
  $(".navigation a").on("click", function () {
    if ($(".navigation").hasClass("show")) {
      // 直接移除show类，立即关闭菜单
      $(".navigation").removeClass("show");
      $(".menu-btn").removeClass("active");

      // 恢复页面滚动
      $("body").css("overflow", "");
    }
  });

  // 点击页面其他区域关闭菜单
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

  // 窗口尺寸变化处理
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

export {
  handleScrollAnimations,
  handleNavHighlight,
  highlightCurrentNavItem,
  initAnimations,
};
