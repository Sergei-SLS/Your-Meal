import { API_URL } from "./const.js";

export const createCardProduct = (product) => {
  const li = document.createElement("li");
  li.classList.add("catalog_item");

  li.innerHTML = `
      <articale class="product" data-id-product=${product.id}>
      <img
        src="${API_URL}/${product.image}"
        alt="${product.title}"
        class="product_image"
      />
  
      <p class="product_price">
      ${product.price}<span class="currency">₽</span>
      </p>
  
      <h3 class="product_title">
        <button class="product_detail">${product.title}</button>
      </h3>
  
      <p class="product_weight">${product.weight}г</p>
  
      <button class="product_add" type="button">Добавить</button>
    </articale>
      `;

  return li;
};
