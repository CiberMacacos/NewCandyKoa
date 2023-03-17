const isCart = JSON.parse(localStorage.getItem("product"));
if (isCart == null) {
  const cart = [];
  localStorage.setItem("product", JSON.stringify(cart));
}

const $products = document.querySelector("#container");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idProduct = urlParams.get("id");

async function getData() {
  const res = await fetch("./assets/products.json");
  const json = await res.json();
  console.log(json);

  json.forEach((product) => {
    if (product.id == idProduct) {
      const $div = document.createElement("div");
      $div.innerHTML = `<div class="w-full h-full flex flex-col md:flex-row items-center border-blue-800 flex-row max-w-xl gap-5">
                          <div class="w-auto h-auto md:w-full md:h-auto bg-transparent items-center">
                          <img class="w-56 h-auto md:w-auto md:h-auto" src="${product.image}" alt="${product.name}" />
                          </div>
                          <div class="justify-center">
                          <h6>${product.name}</h6>
                          <p>${product.price}€</p>
                          <br>
                          <div class="inline-flex mr-1 md:gap-3">
                          <img class="w-8 md:w-10 h-auto md:h-auto" src="assets/icon/leche.jpeg" alt="Lactosa"></img>
                          <img class="w-12 md:w-14 h-auto md:h-auto" src="assets/icon/azucar.webp" alt="Azúcar"></img>
                          </div>
                          </div>
                          </div>
                          <div>
                          <div class="bg-blue-50 w-auto md:p-4 flex flex-col items-center border-blue-800 flex-row max-w-xl hover:bg-pink-50 gap-5">
                          <div class="flex flex-col justify-between p-4 leading-normal text-justify">
                            <p class="mb-3 font-normal text-sm md:text-2xl text-black">${product.description}</p>
                            <br>
                            <p class="md:mb-3 font-normal text-sm md:text-xl text-black">Ingredientes: ${product.ingredients}</p>
                            <br>
                            <p class="mb-3 md:font-normal text-sm md:text-xl text-black "> Alérgenos: ${product.allergens}</p>
                            </div>
                            </p>
                            <img id="addButton" data-code="${product.stripeCode}" data-value="${product.id}" data-image="${product.image}" data-name="${product.name}" data-price="${product.price}" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer hover:invert" src="assets/icon/carrito-de-compra-anadir.png" alt="Comprar"></div>
                          </div>
                          </div>`;
      $products.appendChild($div);
    }
  });
  const buy = document.querySelector("#addButton"); // con el for recorremos todos los botones y les añadimos el eventListener
  buy.addEventListener("click", () => {
    addProduct(buy.dataset.value, buy.dataset.image, buy.dataset.name, buy.dataset.price, buy.dataset.code);
    // estos parámetros son las etiquetas que hemos puesto en los botones, y así directamente ya mete la info al hacer clic en cada producto.
    // esto llama a la función que hay desarrollada más abajo, que es la que tendremos que importar si queremos.
  });
}
getData();

// esta función de addProduct es la que tendremos que poner aparte para importarla a todas las páginas si queremos hacerlo así. De esta manera ya la tenemos lista para copiar y pegar en otro js y utilizarla.
// esta función añade el producto. Busca si ya está, y si está le aumenta la cantidad, si no, lo añade.
function addProduct(idproduct, image, name, price, code) {
  const actualCart = JSON.parse(localStorage.getItem("product"));// aquí traemos el carrito que haya y lo transformamos en objeto para poder leerlo.
  let found = false; // esto es para poder hacer la función de sumar cantidad o de introducir uno nuevo
  for (const value of actualCart) { // con el for of recorremos el carrito que nos hemos traído
    if (value.id === idproduct) { // aquí comparamos el id de los productos que hayan en el carrito y lo comparamos con el id del que queremos meter (pongo id porque ya arriba está el parámetro definido y te devuelve directamente el id del producto)
      value.cantidad++; // si es el mismo, se incrementa la cantidad
      found = true; // marco como encontrado el producto
    }
  }
  if (!found) { // aquí, si el producto NO es encontrado entonces...
    const lineProduct = { id: idproduct, imagen: image, nombre: name, precio: price, cantidad: 1, codigo: code }; // meto el nuevo producto al carrito con los atributos que indico y AÑADO CANTIDAD:1 para que refleje la cantidad acumulada
    actualCart.push(lineProduct); // como no hay ningún producto con el id igual, añado este producto al carrito que teníamos
  }
  localStorage.setItem("product", JSON.stringify(actualCart)); // transformo el carrito (bien con el producto nuevo añadido, o bien aumentada la cantidad) en STRING para meterlo de nuevo en el localStorage
}

// así funciona perfecto, se añaden los productos y se aumenta la cantidad.
// si quieres investigar otros métodos, copiate el código y experimentas, y así nos aseguramos de que pase lo que pase nos va a funcionar.

const $recomended = document.querySelector("#recomended");

async function getDataRecommended() {
  const res = await fetch("./assets/products.json");
  const json = await res.json();
  const chosenProducts = random(0, json.length, 4);
  for (let i = 0; i < chosenProducts.length; i++) {
    const $div = document.createElement("div");
    $div.innerHTML = `<div class="flex flex-col md:flex-col lg:flex-row lg:gap-9 md:gap-3 gap-3 md:w-48 md:h-48 lg:w-full lg:h-72">
                        <div class="flex flex-row md:flex-col lg:flex-col gap-2 items-center border-1 lg:text-center border-gray-100 rounded-lg shadow-lg lg:shadow-xl lg:w-60 lg:h-72 lg:hover:scale-110 md:hover:scale-110 md:hover:ease-linear duration-150 ease-in">
                        <img class="w-20 h-20 md:w-full lg:w-full md:h-full lg:h-48 rounded-l-lg md:rounded-t-lg md:rounded-bl-none lg:rounded-t-lg lg:rounded-bl-none" src="${json[chosenProducts[i]].image}" alt="${json[chosenProducts[i]].name}"></a>
                        <div class="flex flex-col lg:p-4 gap-2">
                        <h1><a class="font-bold text-left p-3" href="details.html?id=${json[chosenProducts[i]].id}">${json[chosenProducts[i]].name}</a></h1>
                        <h3 class="font-semibold">${json[chosenProducts[i]].price}€</h3>
                        </div>
                        </div>
                        </div>`;
    $recomended.appendChild($div);
  };
}
getDataRecommended();

function random(min, max, num) {
  const res = [];
  for (let i = 0; i < num; i++) {
    // mientras la longitud de "res" (que tiene los valores a devolver) es igual al índice del for (quiere decir que no se ha añadido a res nada nuevo)
    while (res.length === i) {
      let found = false;
      const number = Math.floor(Math.random() * max) + min;
      for (const value of res) {
        if (value === number) {
          found = true;
        }
      }

      if (!found) {
        res.push(number);
      }
    }
  }

  return res;
}
