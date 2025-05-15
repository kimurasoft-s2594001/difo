import { loadBefore, loadAfter } from "../common.js";

const newsData = [
  {
    id: 1,
    title: "出展のお知らせ（4/23～25）",
    date: "2025-04-15",
    category: "event",
    image: "img/news/exhibition.png",
    excerpt: "第16回 EDIX（教育総合展）東京",
    detail_url: "news-detail.html?id=1",
    detail_content: {
      title: "第16回 EDIX（教育総合展）東京",
      content: `このたび、弊社は第16回 EDIX（教育総合展）東京に出展する運びとなりました。
            <br />
            本展示会は2025/4/23（水）～25（金） に東京ビッグサイト 南展示棟で開催され、当社は最新の製品および技術を出展いたします。業界の皆様やお客様との貴重な交流の機会として、心よりご来場をお待ちしております。...`,
    },
  },
  {
    id: 2,
    title: "出展のお知らせ（6/11～13）",
    date: "2025-04-10",
    category: "event",
    image: "img/news/exhibition.png",
    excerpt: "第8回 EDIX（教育 総合展）大阪",
    detail_url: "news-detail.html?id=2",
    detail_content: {
      title: "第8回 EDIX（教育総合展）大阪",
      content: `このたび、弊社は第8回 EDIX（教育総合展）大阪に出展する運びとなりました。
            <br />
            本展示会は2025/6/11（水）～13（金） に大阪インテックスで開催され、当社は最新の製品および技術を出展いたします。関西地区の業界の皆様やお客様との貴重な交流の機会として、心よりご来場をお待ちしております。
            <br /><br />
            出展情報：
            <ul>
              <li>ブース番号： ST-18</li>
              <li>会期： 2025/6/11（水）～13（金）</li>
              <li>会場： 大阪インテックス</li>
            </ul>...`,
    },
  },
  {
    id: 3,
    title: "新製品公開のお知らせ",
    date: "2025-04-05",
    category: "product",
    image: "img/news/soft.png",
    excerpt: "10月に新製品を公開予定です。詳細はお待ちください。",
  },
  {
    id: 4,
    title: "公開予定",
    date: "2025-01-01",
    category: "update",
    image: "img/svg/no-image-placeholder.svg",
    excerpt: "公開予定",
  },
  {
    id: 5,
    title: "公開予定",
    date: "2025-01-01",
    category: "event",
    image: "img/svg/no-image-placeholder.svg",
    excerpt: "公開予定",
  },
];
const ITEMS_PER_PAGE = 4;
let currentPage = 1;
let filteredNews = [...newsData];

function onEvent() {
  $(".news-category").on("click", function () {
    $(".news-category").removeClass("active");
    $(this).addClass("active");
    const category = $(this).data("category");
    if (category === "all") {
      filteredNews = [...newsData];
    } else {
      filteredNews = newsData.filter((item) => item.category === category);
    }
    currentPage = 1;
    renderNewsItems();
    updatePagination();
  });
  $("#prev-page").on("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderNewsItems();
      updatePagination();
      scrollToTop();
    }
  });
  $("#next-page").on("click", function () {
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
      currentPage++;
      renderNewsItems();
      updatePagination();
      scrollToTop();
    }
  });
}

// Render news items
function renderNewsItems() {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredNews.slice(startIndex, endIndex);
  const $newsItems = $(".news-items");
  $newsItems.empty();
  if (currentItems.length === 0) {
    $newsItems.html('<div class="no-results">検索結果がありません</div>');
    return;
  }
  currentItems.forEach((item) => {
    const formattedDate = formatDate(item.date);
    const $newsItem = $(`
        <div class="news-item">
            <div class="news-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-item-content">
                <div class="news-item-meta">
                    <span class="news-item-date">${formattedDate}</span>
                    <span class="news-item-category ${
                      item.category
                    }">${getCategoryName(item.category)}</span>
                </div>
                <h3 class="news-item-title">
                    <a href="news-detail.html?id=${item.id}">${item.title}</a>
                </h3>
                <div class="news-item-excerpt">${item.excerpt}</div>
            </div>
        </div>
    `);
    $newsItems.append($newsItem);
  });
}

// Update pagination
function updatePagination() {
  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  $(".current-page").text(currentPage);
  $(".total-pages").text(totalPages);
  if (currentPage <= 1) {
    $("#prev-page").prop("disabled", true);
  } else {
    $("#prev-page").prop("disabled", false);
  }
  if (currentPage >= totalPages) {
    $("#next-page").prop("disabled", true);
  } else {
    $("#next-page").prop("disabled", false);
  }
}

// Helper functions
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function getCategoryName(category) {
  switch (category) {
    case "product":
      return "製品情報";
    case "event":
      return "イベント";
    case "update":
      return "アップデート";
    default:
      return "";
  }
}

function scrollToTop() {
  location.href = "#header";
}

function initialize() {
  onEvent();
  renderNewsItems();
  updatePagination();
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  initialize();
  loadAfter();
});
