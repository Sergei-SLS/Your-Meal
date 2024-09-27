import {
  catalogList,
  counAmount,
  modalProductBtn,
  orderCount,
  orderList,
  orderTotalAmount,
  orderWrapTitle,
  order,
  orderSubmit,
  modalDelivery,
} from "./elements.js";
import { getData } from "./getData.js";
import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { orderController } from "./orderController.js";

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

  orderSubmit.disabled = !cartList.length;
  const allIdProduct = cartList.map((item) => item.id);
  const data = cartList.length
    ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`)
    : [];
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
    <button class="count_minus" data-id-product=${product.id}>-</button>
    <p class="count_amount">${product.count}</p>
    <button class="count_plus" data-id-product=${product.id}>+</button>
  </div>
    `;

    return li;
  });

  orderList.textContent = "";
  orderList.append(...cartItems);

  orderTotalAmount.textContent = data.reduce((acc, item) => {
    const product = cartList.find((cartItem) => cartItem.id === item.id);
    return acc + item.price * product.count;
  }, 0);
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

const removeCart = (id) => {
  const cartList = getCart();
  const productIndex = cartList.findIndex((item) => item.id === id);
  cartList[productIndex].count -= 1;

  if (cartList[productIndex].count === 0) {
    cartList.splice(productIndex, 1);
  }

  updateCartList(cartList);
};

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

  orderList.addEventListener("click", ({ target }) => {
    const targetPlus = target.closest(".count_plus");
    const targetMinus = target.closest(".count_minus");

    if (targetPlus) {
      addCart(targetPlus.dataset.idProduct);
    }

    if (targetMinus) {
      removeCart(targetMinus.dataset.idProduct);
    }
  });

  const closeOrder = (event) => {
    if (event.key === "Escape") {
      modalDelivery.classList.remove("modal_open");
      document.removeEventListener("keydown", closeOrder);
    }
  };

  orderWrapTitle.addEventListener("click", () => {
    order.classList.toggle("order_open");
  });

  orderSubmit.addEventListener("click", () => {
    modalDelivery.classList.add("modal_open");
    document.addEventListener("keydown", closeOrder);
  });

  modalDelivery.addEventListener("click", ({ target }) => {
    if (target.closest(".modal_close") || modalDelivery === target) {
      modalDelivery.classList.remove("modal_open");
    }
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
  orderController(getCart);
};
