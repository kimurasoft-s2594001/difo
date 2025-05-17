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
    
    // 使用与图片匹配的HTML结构
    newsItem.innerHTML = `
      <div class="news-meta">
        <div class="news-date">${formattedDate}</div>
        <span class="news-category ${item.category}">${newsUtils.getCategoryName(item.category)}</span>
      </div>
      <div class="news-content">
        <h3>${item.title}</h3>
        <p>${item.excerpt}</p>
      </div>
    `;
    
    // 为整个新闻项添加点击事件
    newsItem.addEventListener('click', () => {
      window.location.href = `news-detail.html?id=${item.id}`;
    });
    newsItem.style.cursor = 'pointer';
    
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

  // 导航高亮功能已通过app.js中的highlightCurrentNavItem实现
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  renderLatestNews();
  initPageFeatures();
  loadAfter();
});
