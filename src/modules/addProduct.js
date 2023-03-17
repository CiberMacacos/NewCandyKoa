// esta función añade el producto. Busca si ya está, y si está le aumenta la cantidad, si no, lo añade.

import { totalItems } from "./totalItems";
import { updatePrice } from "./updatePrice";

export function addProduct(idproduct, image, name, price, code) {
  const actualCart = JSON.parse(localStorage.getItem("product"));// aquí traemos el carrito que haya y lo transformamos en objeto para poder leerlo.
  let found = false; // esto es para poder hacer la función de sumar cantidad o de introducir uno nuevo

  for (const i of actualCart) { // con el for of recorremos el carrito que nos hemos traído
    // aquí comparamos el id de los productos que hayan en el carrito y lo comparamos con el id del que queremos meter
    // (pongo id porque ya arriba está el parámetro definido y te devuelve directamente el id del producto)

    if (i.id === idproduct) {
      i.cantidad++; // si es el mismo, se incrementa la cantidad
      found = true; // marco como encontrado el producto
      if (document.URL.includes("cart.html")) {
        const decButton = document.querySelectorAll("#decButton");
        const productIndex = actualCart.indexOf(i);
        const amountHtml = document.querySelector(`#amount-${+productIndex}`);
        amountHtml.textContent++;

        if (i.cantidad > 1) {
          decButton[productIndex].classList.remove("invisible");
        }
      }
    }
  }

  if (!found) { // aquí, si el producto NO es encontrado entonces
    const lineProduct = { id: idproduct, imagen: image, nombre: name, precio: price, cantidad: 1, codigo: code }; // meto el nuevo producto al carrito con los atributos que indico y AÑADO CANTIDAD:1 para que refleje la cantidad acumulada
    actualCart.push(lineProduct); // como no hay ningún producto con el id igual, añado este producto al carrito que teníamos
  }

  localStorage.setItem("product", JSON.stringify(actualCart)); // transformo el carrito (bien con el producto nuevo añadido, o bien aumentada la cantidad) en STRING para meterlo de nuevo en el localStorage
  const products2 = JSON.parse(localStorage.getItem("product"));
}
