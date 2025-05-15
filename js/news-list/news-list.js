import { loadBefore, loadAfter } from "../common.js";
import { newsData } from "../news-data.js";
import { initLazyLoading } from "../lazy-load.js";

const ITEMS_PER_PAGE = 4;
let currentPage = 1;
let filteredNews = [...newsData];

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
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="news-item-content">
          <div class="news-item-meta">
            <span class="news-item-date">${formattedDate}</span>
            <span class="news-item-category ${item.category}">${getCategoryName(
      item.category
    )}</span>
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
  // 按日期降序排序（最新的在前）
  filteredNews = [...newsData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  onEvent();
  renderNewsItems();
  updatePagination();
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  initLazyLoading();
  initialize();
  loadAfter();
});
