import { loadBefore, loadAfter } from "../common.js";
import { initLazyLoading } from "../lazy-load.js";

document.addEventListener("DOMContentLoaded", function () {
  loadBefore();
  initLazyLoading();
  loadAfter();
});
