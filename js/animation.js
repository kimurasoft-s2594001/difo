// animation.js - 滚动动画效果
import { throttle } from "./utils.js";

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

  // 监听滚动事件
  window.addEventListener(
    "scroll",
    throttle(() => {
      handleScrollAnimations();
      handleNavHighlight();
    }, 100)
  );

  // 平滑滚动处理
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

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

// 当DOM加载完成后初始化
document.addEventListener("DOMContentLoaded", initAnimations);

export { handleScrollAnimations, handleNavHighlight };
