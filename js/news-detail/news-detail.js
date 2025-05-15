import { loadBefore, loadAfter } from "../common.js";
import { initLazyLoading } from "../lazy-load.js";

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

      // 确保所有联系信息是最新的
      updateContactInfo(newsContentElement);
    }

    // 其他功能...
  } else {
    // 处理找不到新闻的情况
    handleNewsNotFound();
  }
}

// 更新联系信息
function updateContactInfo(element) {
  // 更新电话号码
  element
    .querySelectorAll(
      'li:contains("03-6807-9627"), li:contains("03 6807 9627"), li:contains("048-430-7969")'
    )
    .forEach((el) => {
      el.textContent = companyInfo.phone;
    });

  // 更新邮箱
  element.querySelectorAll('li:contains("@mana-tsuru.co.jp")').forEach((el) => {
    if (el.textContent.includes("@")) {
      el.textContent = companyInfo.email;
    }
  });

  // 更新地址
  element.innerHTML = element.innerHTML.replace(
    /〒\d{3}-\d{4}[\s\S]*?(?=<\/p>)/g,
    `〒${companyInfo.zipCode}<br>${companyInfo.address1}<br>${companyInfo.address2}`
  );
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  initLazyLoading();
  loadNewsContent();
  loadAfter();
});
