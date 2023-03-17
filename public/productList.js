// importación del módulo createListeners
import { createListeners } from "./modules/createListeners";
import { getData } from "./modules/getData";

const products = document.querySelector("#container"); // seleccionamos el div que va a contener los productos
const template = document.querySelector("template"); // el template parece que solo puede ser targeteado por tagname, id no me deja

const isCart = JSON.parse(localStorage.getItem("product"));
if (isCart == null) {
  const cart = [];
  localStorage.setItem("product", JSON.stringify(cart));
}

async function createCards(data, template) { // esto también podría convertirse en módulo quizás para otras páginas (muy probablemente deberíamos)
  const json = await data;
  json.forEach((product) => { // aquí es donde creamos las tarjetas de cada producto
    const html = template.content.cloneNode(true); // clonamos el template targeteado al principio del fichero

    const templateProductImg = html.querySelector("#productImg"); // en este bloque seleccionamos cada parte del html en la que ponemos info
    const templateh1 = html.querySelector("#templateh1");
    const templateh3 = html.querySelector("#templateh3");
    const addButton = html.querySelector("#addButton");

    templateProductImg.src = product.image; // aquí se añade la info a cada dataset o atributo html
    templateProductImg.alt = product.name;

    templateh1.href = `details.html?id=${product.id}`;
    templateh1.textContent = product.name;

    templateh3.textContent = product.price;

    addButton.dataset.value = product.id;
    addButton.dataset.image = product.image;
    addButton.dataset.name = product.name;
    addButton.dataset.price = product.price;
    addButton.dataset.code = product.stripeCode;

    products.appendChild(html); // se añade la tarjeta al div de tarjetas
    ;// llamada a la función encargada de añadir el evento a todos los botones #addbutton
  });
  createListeners("add");
}

const DATA = getData(); // se llama a getData en una constante para pasarla como parámetro a createCards
createCards(DATA, template);
