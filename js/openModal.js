import {
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsList,
  ingredientsCalories,
  modalProductPriceCount,
  modalProduct,
} from "./elements.js";

export const openModal = (product) => {
  modalProductTitle.textContent = product.title;
  modalProductImage.src = product.image;
  ingredientsList.textContent = "";

  const ingredientsListItems = product.ingredients.map((item) => {
    const li = document.createElement("li");
    li.classList.add("ingredients_item");
    li.textContent = item;
    return li;
  });

  modalProductDescription.textContent = product.description;
  modalProductPriceCount.textContent = product.price;
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;

  ingredientsList.append(...ingredientsListItems);

  modalProduct.classList.add("modal_open");
};
