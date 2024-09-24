import {
  catalogList,
  counAmount,
  modalProductBtn,
  orderCount,
  orderList,
} from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";

const getCart = () => {
  const cartList = localStorage.getItem("cart");
  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
};

const renderCartList = async () => {
  const cartList = getCart();
  const allIdProduct = cartList.map((item) => item.id);
  const data = await getData(
    `${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`
  );
  const countProduct = cartList.reduce((acc, item) => acc + item.count, 0);
  orderCount.textContent = countProduct;

  const cartItems = data.map((item) => {
    const li = document.createElement("li");
    li.classList.add("order_item");
    li.dataset.idProduct = item.id;

    const product = cartList.find((cartItem) => cartItem.id === item.id);

    li.innerHTML = `
    <img
    class="order_image"
    src="${API_URL}/${item.image}"
    alt="${item.title}"
  />

  <div class="order_product">
    <h3 class="order_product-title">${item.title}</h3>
    <p class="order_product-weight">${item.weight}</p>

    <p class="order_product-price">
      ${item.price}
      <span class="currency">₽</span>
    </p>
  </div>

  <div class="order_product-count count">
    <button class="count_minus">-</button>
    <p class="count_amount">${product.count}</p>
    <button class="count_plus">+</button>
  </div>
    `;

    return li;
  });

  orderList.textContent = "";
  orderList.append(...cartItems);
};

const updateCartList = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
  renderCartList();
};

const addCart = (id, count = 1) => {
  console.log(id, count);
  const cartList = getCart();
  const product = cartList.find((item) => item.id === id);

  if (product) {
    product.count += count;
  } else {
    cartList.push({ id, count });
  }

  updateCartList(cartList);
};

const removeCart = (id) => {};

const cartController = () => {
  catalogList.addEventListener("click", ({ target }) => {
    if (target.closest(".product_add")) {
      addCart(target.closest(".product").dataset.idProduct);
    }
  });

  modalProductBtn.addEventListener("click", () => {
    addCart(
      modalProductBtn.dataset.idProduct,
      parseInt(counAmount.textContent)
    );
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
};
