import { loadBefore, loadAfter, newsUtils } from "../app.js";

/**
 * 格式化新闻内容，增强展示效果
 * @param {Object} newsItem 新闻对象
 * @returns {string} 格式化后的HTML内容
 */
function formatNewsContent(newsItem) {
  // 创建基本内容结构
  let formattedContent = `
    <div class="news-header">
      <div class="news-title">${newsItem.title}</div>
      <div class="news-meta">
        <div class="news-date">${newsUtils.formatDate(newsItem.date)}</div>
        <span class="news-category ${newsItem.category}">${newsUtils.getCategoryName(newsItem.category)}</span>
      </div>
    </div>
    <div class="news-content">
      ${enhanceContentStructure(newsItem.content)}
    </div>
  `;
  
  return formattedContent;
}

/**
 * 增强内容结构，改进显示效果
 * @param {string} content 原始HTML内容
 * @returns {string} 增强后的HTML内容
 */
function enhanceContentStructure(content) {
  let enhancedContent = content;
  
  // 查找并标记展示信息块
  const exhibitionInfoRegex = /出展情報：/;
  if (exhibitionInfoRegex.test(enhancedContent)) {
    enhancedContent = enhancedContent.replace(
      /<p>出展情報：<\/p>/g, 
      '<div class="info-section"><div class="info-section-title">出展情報：</div>'
    );
  }
  
  // 查找并标记展示会的看点
  const highlightsRegex = /展示会の見どころ：/;
  if (highlightsRegex.test(enhancedContent)) {
    enhancedContent = enhancedContent.replace(
      /<p>展示会の見どころ：<\/p>/g, 
      '<div class="info-section exhibition-highlights"><div class="info-section-title">展示会の見どころ：</div>'
    );
  }
  
  // 查找并标记来场相关信息
  const visitInfoRegex = /ご来場について：/;
  if (visitInfoRegex.test(enhancedContent)) {
    enhancedContent = enhancedContent.replace(
      /<p>ご来場について：<\/p>/g, 
      '<div class="info-section visit-info"><div class="info-section-title">ご来場について：</div>'
    );
  }
  
  // 为联系信息添加特殊样式
  const contactInfoRegex = /(TEL|メール|電話|連絡先).*?(\d{2,4}[- ]?\d{2,4}[- ]?\d{2,4}|[\w.]+@[\w.]+)/;
  if (contactInfoRegex.test(enhancedContent)) {
    enhancedContent = enhancedContent.replace(
      /<p>.*?(TEL|メール|電話|連絡先).*?<\/p>/g, 
      '<div class="contact-info">$&</div>'
    );
  }
  
  // 添加展示信息格式化
  enhancedContent = enhancedContent.replace(
    /<li>ブース番号：(.*?)<\/li>/g, 
    '<li class="exhibition-info-item"><span class="exhibition-info-label">ブース番号：</span><span>$1</span></li>'
  );
  
  enhancedContent = enhancedContent.replace(
    /<li>会期：(.*?)<\/li>/g, 
    '<li class="exhibition-info-item"><span class="exhibition-info-label">会期：</span><span>$1</span></li>'
  );
  
  enhancedContent = enhancedContent.replace(
    /<li>会場：(.*?)<\/li>/g, 
    '<li class="exhibition-info-item"><span class="exhibition-info-label">会場：</span><span>$1</span></li>'
  );
  
  // 确保所有列表项都有适当的样式
  enhancedContent = enhancedContent.replace(
    /<ul>([\s\S]*?)<\/ul>/g,
    function(match, listContent) {
      // 只处理未已经格式化的普通列表项
      if (!match.includes('class="exhibition-info-item"')) {
        return '<ul>' + 
               listContent.replace(
                 /<li>(.*?)<\/li>/g, 
                 '<li>$1</li>'
               ) + 
               '</ul>';
      }
      return match;
    }
  );
  
  return enhancedContent;
}

/**
 * 加载新闻内容并显示
 */
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
      newsContentElement.innerHTML = formatNewsContent(newsItem);
    }
  } else {
    // 处理找不到新闻的情况
    handleNewsNotFound();
  }
}

/**
 * 处理找不到新闻的情况
 */
function handleNewsNotFound() {
  const newsContentElement = document.querySelector(".news-detail-content");
  if (newsContentElement) {
    newsContentElement.innerHTML = `
      <div class="news-not-found">
        <h3>ニュースが見つかりません</h3>
        <p>お探しのニュース記事は見つかりませんでした。</p>
        <a href="news-list.html" class="back-button"><i class="fas fa-arrow-left"></i> ニュース一覧に戻る</a>
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  loadNewsContent();
  loadAfter();
});
