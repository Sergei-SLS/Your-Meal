import { modalProduct, catalogList } from "./elements.js";

import { createCardProduct } from "./createCardProduct.js";

const burgerMax = {
  title: "Burger Max",
  price: 100000,
  weight: 5000,
  calories: 15000,
  description: "The over, super, big burger!",
  image: "img/photo-2.jpg",
  ingredients: ["bread", "meat", "cheese", "tomato", "souce"],
};

import { openModal } from "./openModal.js";
import { renderListProduct } from "./renderListProduct.js";
import { navigationListControler } from "./navigationListControler.js";

catalogList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".product_detail") || target.closest(".product_image")) {
    openModal(burgerMax);
  }
});

modalProduct.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".modal_close") || target === modalProduct) {
    modalProduct.classList.remove("modal_open");
  }
});

const init = () => {
  renderListProduct();
  navigationListControler();
};

init();
