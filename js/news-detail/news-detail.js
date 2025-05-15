import { loadBefore, loadAfter, companyInfo } from "../common.js";
import { newsUtils } from "../news-data.js";

function loadNewsContent() {
  // 获取URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = parseInt(urlParams.get("id") || "1");

  // 获取新闻内容
  const newsItem = newsUtils.getById(newsId);

  if (newsItem) {
    // 更新页面标题
    document.title = newsItem.title;

    // 填充内容
    const newsContentElement = document.querySelector(".news-detail-content");
    if (newsContentElement) {
      newsContentElement.innerHTML = newsItem.content;
    }
  } else {
    // 处理找不到新闻的情况
    // handleNewsNotFound();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  loadNewsContent();
  loadAfter();
});
