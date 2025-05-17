/**
 * 初始化导航菜单项索引
 * 用于设置级联动画的索引
 */
export function setupMenuIndexes() {
  $(".navigation a").each(function (index) {
    $(this).css("--menu-index", index + 1);
  });
}

/**
 * 高亮显示当前导航项
 * 根据URL和滚动位置确定当前页面
 */
export function highlightCurrentNavItem() {
  // 获取当前页面URL信息
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  // 移除所有active类
  $(".navigation a").removeClass("active");

  // 当前页面标识
  let currentPageId = "";

  // 方法1: 基于URL判断当前页面
  if (
    currentPath.endsWith("index.html") ||
    currentPath === "/" ||
    currentPath.endsWith("/")
  ) {
    // 首页情况
    if (currentHash) {
      // 有hash，根据hash判断
      currentPageId = currentHash.replace("#", "");
    } else {
      // 无hash，默认为home
      currentPageId = "home";
    }
  } else {
    // 非首页，提取文件名作为ID
    currentPageId = currentPath.split("/").pop().split(".")[0];
  }

  // 方法2: 基于可视区域判断当前部分
  // 仅在首页且无hash时使用
  if (
    (currentPath.endsWith("index.html") ||
      currentPath === "/" ||
      currentPath.endsWith("/")) &&
    !currentHash &&
    $("#home").length
  ) {
    // 获取所有部分
    const sections = ["home", "products", "plan", "about", "recruit", "news"];

    // 检查哪个部分最接近视窗顶部
    let minDistance = Infinity;

    sections.forEach((sectionId) => {
      const $section = $("#" + sectionId);
      if ($section.length) {
        // 计算部分顶部到视窗顶部的距离（考虑导航栏高度）
        const rect = $section[0].getBoundingClientRect();
        const distance = Math.abs(rect.top - 70); // 70px是导航栏高度

        if (distance < minDistance) {
          minDistance = distance;
          currentPageId = sectionId;
        }
      }
    });
  }

  // 应用active类到对应链接
  let activeSet = false;

  // 菜单ID与文本的映射
  const menuTextMap = {
    home: "ホーム",
    products: "製品紹介",
    plan: "プラン",
    about: "会社概要",
    recruit: "採用情報",
    news: "ニュース",
  };

  $(".navigation a").each(function () {
    const $link = $(this);
    const href = $link.attr("href");
    if (!href) return;

    // 检查1: 链接文字与当前页面ID匹配
    if ($link.text().trim() === menuTextMap[currentPageId]) {
      $link.addClass("active");
      activeSet = true;
      return false; // 跳出循环
    }
    // 检查2: 链接href包含当前页面ID
    else if (href.includes("#" + currentPageId)) {
      $link.addClass("active");
      activeSet = true;
      return false;
    }
    // 检查3: 链接href与当前路径匹配
    else if (
      href === currentPath ||
      (currentPath.endsWith("/") && href === "index.html") ||
      (href === "/" && currentPath.endsWith("index.html"))
    ) {
      $link.addClass("active");
      activeSet = true;
      return false;
    }
  });

  // 如果没有设置active项但在首页，默认高亮"ホーム"
  if (
    !activeSet &&
    (currentPath.endsWith("index.html") ||
      currentPath === "/" ||
      currentPath.endsWith("/"))
  ) {
    $(".navigation a").each(function () {
      if ($(this).text().trim() === "ホーム") {
        $(this).addClass("active");
        return false;
      }
    });
  }
}

/**
 * 检查元素是否在视口中
 * @param {jQuery} $el 要检测的jQuery元素
 * @returns {boolean} 是否在视口中
 */
function isElementInViewport($el) {
  if (!$el.length) return false;

  const rect = $el[0].getBoundingClientRect();
  const windowHeight = $(window).height();

  // 元素的顶部在视口中，且至少有25%在视口内
  return (
    rect.top >= -0.25 * rect.height &&
    rect.top <= windowHeight - 0.25 * rect.height
  );
}
