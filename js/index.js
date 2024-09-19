const modalProduct = document.querySelector(".modal_product");
const catalogList = document.querySelector(".catalog_list");
const product = {
  title: "Burger Max",
  price: 1,
  weight: 5000,
  calories: 15,
  description: "The over, super, big burger!",
  image: "img/photo-2.jpg",
  ingredients: ["bread", "meat", "cheese", "tomato", "souce"],
};

const modalProductTitle = document.querySelector(".modal-product_title");
const modalProductImage = document.querySelector(".modal-product_image");
const modalProductDescription = document.querySelector(
  ".modal-product_description"
);
const ingredientsList = document.querySelector(".ingredients_list");
const ingredientsCalories = document.querySelector(".ingredients_calories");
const modalProductPriceCount = document.querySelector(
  ".modal-product_price-count"
);

modalProductTitle.textContent = product.title;
modalProductImage.src = product.image;
ingredientsList.textContent = "";

const ingredientsListItems = product.ingredients.map((item) => {
  const li = document.createElement("li");
  li.classList.add("ingredients_item");
  li.textContent = item;
  return li;
});

ingredientsList.append(...ingredientsListItems);

catalogList.addEventListener("click", (event) => {
  const target = event.target;

  if (target.closest(".product_detail") || target.closest(".product_image")) {
    modalProduct.classList.add("modal_open");
  }
});

modalProduct.addEventListener("click", (event) => {
  const target = event.target;
  if (target.closest(".modal_close") || target === modalProduct) {
    modalProduct.classList.remove("modal_open");
  }
});
