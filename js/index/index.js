// js/index/index.js
import { loadBefore, loadAfter } from "../app.js";
import { newsUtils } from "../common/news-data.js";

/**
 * 渲染最新新闻到页面
 */
function renderLatestNews() {
  // 获取最新的3条新闻
  const latestNews = newsUtils.getLatest(3);
  const newsGrid = document.querySelector(".news-grid");

  if (!newsGrid) return;

  // 清空现有内容
  newsGrid.innerHTML = "";

  // 添加新闻项
  latestNews.forEach((item) => {
    const formattedDate = formatDate(item.date);
    const newsItem = document.createElement("div");
    newsItem.className = "news-item fade-in";
    newsItem.innerHTML = `
      <div class="news-content">
        <div class="news-date">${formattedDate}</div>
        <h3>${item.title}</h3>
        <a href="news-detail.html?id=${item.id}">
          <p>${item.excerpt}</p>
        </a>
      </div>
    `;
    newsGrid.appendChild(newsItem);
  });
}

/**
 * 格式化日期为 YYYY.MM.DD 格式
 * @param {string} dateString 日期字符串
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}.${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * 初始化页面特定功能
 */
function initPageFeatures() {
  // 产品图片悬停效果
  const productImages = document.querySelectorAll(".product-image");

  productImages.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      image.classList.add("hovered");
    });

    image.addEventListener("mouseleave", () => {
      image.classList.remove("hovered");
    });
  });

  // 自动突出显示当前部分
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navigation a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  renderLatestNews();
  initPageFeatures();
  loadAfter();
});
