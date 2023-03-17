// IMPORTANTE, hay que importar a este módulo el módulo addProduct AQUÍ en vez de en productList.js para que all llamar a createListeners
// en productList.js funcione.

import { addProduct } from "./addProduct";
import { decreaseProduct } from "./decreaseProduct";
import { removeProduct } from "./removeProduct";
import { clearCart } from "./clearCart";
let buy;
export function createListeners(action) {
  switch (action) {
    case "add":
      buy = document.querySelectorAll("#addButton"); // pon este id en cada botón que quieras que tenga addProduct

      for (let i = 0; i < buy.length; i++) { // con el for recorremos todos los botones y les añadimos el eventListener
        buy[i].addEventListener("click", () => {
          addProduct(buy[i].dataset.value, buy[i].dataset.image, buy[i].dataset.name, buy[i].dataset.price, buy[i].dataset.code);
          // llamada al módulo de añadir producto
          // los parámetros que recibe addProduct son las etiquetas que hemos puesto en los botones, y así directamente
          // ya mete la info al hacer clic en cada producto.
        });
      }
      break;

    case "decrease":
      buy = document.querySelectorAll("#decButton");

      for (let i = 0; i < buy.length; i++) { // con el for recorremos todos los botones y les añadimos el eventListener
        buy[i].addEventListener("click", () => {
          decreaseProduct(buy[i].dataset.value);
        });
      }
      break;

    case "delete":
      buy = document.querySelectorAll("#delete");

      for (let i = 0; i < buy.length; i++) { // con el for recorremos todos los botones y les añadimos el eventListener
        buy[i].addEventListener("click", () => {
          removeProduct(buy[i].dataset.value);
        });
      }
      break;

    case "clear":
      buy = document.querySelector("#clearCart");

      buy.addEventListener("click", () => {
        clearCart();
      });

      break;
  }
}
