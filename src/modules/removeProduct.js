import { createListeners } from "./createListeners.js";
import { totalItems } from "./totalItems";
import { updatePrice } from "./updatePrice";

export function removeProduct(idproduct) {
  const actualCart = JSON.parse(localStorage.product);
  console.log(actualCart);
  actualCart.forEach((product) => {
    if (idproduct == product.id) {
      const productIndex = actualCart.indexOf(product);

      const cartContainer = document.querySelectorAll("#cartContainer");
      // console.log(cartContainer[productIndex]);
      cartContainer[productIndex].remove();

      actualCart.splice(productIndex, 1);
    }
  });
  console.log(actualCart);
  localStorage.setItem("product", JSON.stringify(actualCart));
  totalItems();
  updatePrice();
  createListeners("clear");
  createListeners("add");
  createListeners("decrease");
  createListeners("delete");
}
