export function setupErrorHandling() {
  window.addEventListener(
    "error",
    function (event) {
      console.error("捕获到错误:", event.error);
      // 在这里可以添加错误上报逻辑

      // 简单地向用户显示友好信息
      const errorElements = document.querySelectorAll(".js-error-container");
      if (errorElements.length > 0) {
        errorElements.forEach((el) => {
          el.textContent = "加载内容时出现问题，请稍后再试。";
          el.style.display = "block";
        });
      }

      return false;
    },
    true
  );

  // 处理Promise错误
  window.addEventListener("unhandledrejection", function (event) {
    console.error("未处理的Promise拒绝:", event.reason);
    // 错误处理逻辑
    return false;
  });
}
