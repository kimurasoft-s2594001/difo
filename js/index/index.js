// js/index/index.js
import { loadBefore, loadAfter } from "../common.js";
import { newsData } from "../news-data.js";
import { initLazyLoading } from "../lazy-load.js";

function renderLatestNews() {
  // 获取最新的3条新闻
  const latestNews = [...newsData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  const newsContainer = document.querySelector(
    ".news-container-list .news-list"
  );
  if (!newsContainer) return;

  // 清空现有内容
  newsContainer.innerHTML = "";

  // 添加新闻项
  latestNews.forEach((item) => {
    const newsItem = document.createElement("li");
    newsItem.className = "news-item";
    newsItem.innerHTML = `
      <div class="news-content">
        <h3>${item.title}</h3>
        <a href="news-detail.html?id=${item.id}">
          <p>${item.excerpt}</p>
        </a>
      </div>
    `;
    newsContainer.appendChild(newsItem);
  });

  // 添加"MORE"链接
  const moreItem = document.createElement("li");
  moreItem.className = "more-btn-li";
  moreItem.innerHTML = '<a href="news-list.html">MORE</a>';
  newsContainer.appendChild(moreItem);
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  renderLatestNews();
  initLazyLoading();
  loadAfter();
});
