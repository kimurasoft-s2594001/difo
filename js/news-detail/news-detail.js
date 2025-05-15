import { loadBefore, loadAfter } from "../common.js";
import { newsData, companyInfo } from "../news-data.js";
import { initLazyLoading } from "../lazy-load.js";

function getNewsById(id) {
  return newsData.find((item) => item.id === parseInt(id)) || newsData[0];
}

function loadNewsContent() {
  // 获取URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const newsId = parseInt(urlParams.get("id")) || 1;

  const newsItem = getNewsById(newsId);

  // 更新页面内容
  document.title = newsItem.title;
  $(".news-detail-content").html(newsItem.content);

  // 确保所有电话号码保持一致
  $(".news-detail-content")
    .find("li:contains('048-430-7969')")
    .text(companyInfo.phone);
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  initLazyLoading();
  loadNewsContent();
  loadAfter();
});
