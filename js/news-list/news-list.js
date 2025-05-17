import { loadBefore, loadAfter } from "../app.js";
import {
  newsUtils,
  formatDate,
  getCategoryName,
  newsData,
} from "../common/news-data.js";

const ITEMS_PER_PAGE = 3;
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
  
  // 搜索框事件
  $("#news-search").on("input", function() {
    const keyword = $(this).val().trim();
    const activeCategory = $(".news-category.active").data("category");
    
    if (keyword === "") {
      // 如果搜索框为空，使用当前选中的分类
      if (activeCategory === "all") {
        filteredNews = [...newsData];
      } else {
        filteredNews = newsData.filter((item) => item.category === activeCategory);
      }
    } else {
      // 搜索并过滤
      if (activeCategory === "all") {
        filteredNews = newsUtils.search(keyword);
      } else {
        filteredNews = newsUtils.search(keyword).filter(
          (item) => item.category === activeCategory
        );
      }
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

function scrollToTop() {
  location.href = "#header";
}

// 添加分类过滤器
function addCategoryFilters() {
  const categories = newsUtils.getCategories();
  const filterContainer = $('<div class="news-categories"></div>');

  categories.forEach((category) => {
    // 使用截图中的格式，不显示数量
    const button = $(
      `<button class="news-category${
        category.id === "all" ? " active" : ""
      }" data-category="${category.id}">${category.name}</button>`
    );
    filterContainer.append(button);
  });

  // 添加搜索框
  const searchContainer = $('<div class="news-search"></div>');
  searchContainer.append(
    '<input type="text" id="news-search" placeholder="ニュースを検索...">'  
  );

  $(".news-container").prepend(filterContainer);
  $(".news-container").prepend(searchContainer);
}

// 初始化
function initialize() {
  // 获取所有新闻
  filteredNews = newsUtils.getAll();
  // 添加分类过滤器
  addCategoryFilters();
  // 绑定事件
  onEvent();
  // 渲染新闻列表
  renderNewsItems();
  // 更新分页
  updatePagination();
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  initialize();
  loadAfter();
});
