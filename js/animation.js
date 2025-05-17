// animation.js - 滚动动画效果
import { throttle } from "./utils.js";

/**
 * 高亮显示当前页面对应的导航菜单项
 */
function highlightCurrentNavItem() {
  // 获取当前页面URL路径部分
  const currentPath = window.location.pathname;
  // 获取当前页面的hash部分（如果有）
  const currentHash = window.location.hash;

  // 获取所有导航链接
  const navLinks = document.querySelectorAll(".navigation a");

  // 移除所有active类
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // 匹配导航项并添加active类
  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    // 检查是否匹配当前页面路径
    if (linkHref) {
      // 情况1: 完全匹配URL路径（例如 /index.html）
      if (linkHref === currentPath) {
        link.classList.add("active");
        return;
      }

      // 情况2: 如果是 index.html 且当前也是首页
      if (
        linkHref.includes("index.html") &&
        (currentPath === "/" || currentPath.includes("index"))
      ) {
        // 但不包含hash或hash匹配
        if (
          !linkHref.includes("#") ||
          (currentHash && linkHref.includes(currentHash))
        ) {
          link.classList.add("active");
          return;
        }
      }

      // 情况3: 链接包含hash且hash匹配当前hash
      if (currentHash && linkHref.includes(currentHash)) {
        link.classList.add("active");
        return;
      }

      // 情况4: 匹配当前URL的路径部分（忽略hash）
      if (currentPath !== "/" && linkHref.includes(currentPath)) {
        // 避免部分URL匹配（例如，/about不应匹配/about-us）
        const pathParts = linkHref.split("/");
        const currentParts = currentPath.split("/");
        const lastPathPart = pathParts[pathParts.length - 1].split("#")[0]; // 移除hash部分
        const lastCurrentPart = currentParts[currentParts.length - 1];

        if (lastPathPart === lastCurrentPart) {
          link.classList.add("active");
          return;
        }
      }

      // 情况5：对于首页特殊处理 - 如果链接文本是"ホーム"且当前是首页
      if (
        link.textContent.trim() === "ホーム" &&
        (currentPath === "/" || currentPath.includes("index.html"))
      ) {
        // 检查是否没有hash或当前在页面顶部
        if (!currentHash || currentHash === "" || currentHash === "#home") {
          link.classList.add("active");
          return;
        }
      }

      // 情况6：基于导航项文本内容和当前页面标题匹配
      const pageTitle = document.title.toLowerCase();
      const linkText = link.textContent.trim().toLowerCase();

      if (pageTitle.includes(linkText) && linkText !== "ホーム") {
        // 排除首页通用名称
        link.classList.add("active");
      }
    }
  });
}

// 处理滚动动画
function handleScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;

  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// 处理导航高亮
function handleNavHighlight() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navigation a");
  const sideLinks = document.querySelectorAll(".side-navi a");

  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSectionId = sectionId;
    }
  });

  if (currentSectionId) {
    // 更新主导航高亮
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSectionId)) {
        link.classList.add("active");
      }
    });

    // 更新侧边导航高亮
    sideLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(currentSectionId)) {
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

// 当DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", initAnimations);

export { handleScrollAnimations, handleNavHighlight, highlightCurrentNavItem };
