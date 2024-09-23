import {
  catalogTitle,
  catalogList,
  navigationList,
  navigationListItems,
} from "./elements.js";

export const navigationListControler = (cb) => {
  navigationList.addEventListener("click", (e) => {
    const categoryItem = e.target.closest(".navigation_button");

    if (!categoryItem) return;

    navigationListItems.forEach((item) => {
      if (item === categoryItem) {
        item.classList.add("navigation_button_active");
        catalogTitle.textContent = item.textContent;
        cb(item.dataset.category);
      } else {
        item.classList.remove("navigation_button_active");
      }
    });
  });
};
