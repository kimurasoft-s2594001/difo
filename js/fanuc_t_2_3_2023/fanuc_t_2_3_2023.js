// fanuc_t_2_3_2023.js
import { loadBefore, loadAfter } from "../app.js";
import { triggerFadeAnimations } from "../common/animation.js";

/**
 * 初始化iframe调整大小功能
 */
function setupIframeResizing() {
  // 确保iframe在加载后正确显示
  const iframe = document.getElementById('simulation-frame');
  if (iframe) {
    // 如果iframe加载失败，显示提示信息
    iframe.onerror = function() {
      const container = iframe.closest('.iframe-container');
      if (container) {
        container.innerHTML = `
          <div class="iframe-error">
            <p>シミュレーションの読み込みに失敗しました。</p>
            <p><a href="${iframe.src}" target="_blank">こちらをクリック</a>して新しいタブで開いてください。</p>
          </div>
        `;
      }
    };
  }
}

/**
 * 确保图片内容完整显示
 */
function setupImageDisplay() {
  // 监听图片加载完成事件
  const images = document.querySelectorAll('.image-container img');
  images.forEach(img => {
    img.onload = function() {
      // 图片加载完成后，确保容器适应图片大小
      const container = this.closest('.image-container');
      if (container) {
        // 在移动设备上添加水平滚动提示
        if (window.innerWidth <= 768) {
          const swipeIndicator = document.createElement('div');
          swipeIndicator.className = 'swipe-indicator';
          swipeIndicator.innerHTML = '← スワイプしてください →';
          container.appendChild(swipeIndicator);
        }
      }
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  setupIframeResizing();
  setupImageDisplay();
  loadAfter();
  
  // 确保所有内容淡入显示
  setTimeout(() => {
    triggerFadeAnimations();
  }, 100);
});