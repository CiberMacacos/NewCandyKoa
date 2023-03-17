import KEYS from "./KEYS.js";

const $show = document.querySelector("#productsCart");
const $pay = document.querySelector("#totalize");
const $clearButton = document.querySelector("#clear");
const $stripe = document.querySelector("#payment");

function showCart() {
  const added = JSON.parse(localStorage.getItem("product"));
  for (let i = 0; i < added.length; i++) {
    const $div = document.createElement("div");
    $div.innerHTML = `<div id="productsCart" class="w-full flex justify-around items-center text-center md:gap-4 lg:gap-46 sm:p-4 md:p-6">
                    <div class="flex flex-col gap-3 hidden sm:block">
                    <h1 class="font-bold sm:text-sm ">Productos</h1>
                    <img class="w-12 md:w-28" src="${added[i].imagen}" alt="imagen-producto">
                    </div>
                    <div class="flex flex-col md:gap-3 items-center text-center w-12">
                    <h1 class="font-bold text-sm md:text-base">Nombre</h1>
                    <h2 class="sm:text-sm sm:gap4">${added[i].nombre}</h2>
                    </div>
                    <div class="flex flex-col gap-3 items-center hidden sm:block">
                    <h2 class="font-bold text-sm md:text-base">Precio</h2>
                    <p class="sm:text-sm">${added[i].precio}</p>
                    </div>
                    <div class="flex flex-col gap-3 items-center">
                    <h1 class="font-bold text-sm md:text-base">Cantidad</h1>
                    <div class="flex flex-row gap-6">
                    <button class="bg-pink-300 w-8 h-8 hover:bg-blue-300 text-white font-bold py-2 rounded-full text-sm items-center hidden sm:block" id="resta" data-id=${added[i].id} data-type="sub">-</button>
                    <p class="sm:text-sm" id="cantidad" data-id=${added[i].id}>${added[i].cantidad}</p>
                    <button class="bg-pink-300 w-8 h-8 hover:bg-blue-300 text-white font-bold py-2 rounded-full text-sm items-center hidden sm:block" id="suma" data-id=${added[i].id} data-type="add">+</button>
                    </div>
                    </div>
                    <div class="flex flex-col gap-3">
                    <h2 class="font-bold text-sm md:text-base">Total</h2>
                    <h2 class="sm:text-sm" id="subtotal" data-id=${added[i].id}>${added[i].precio * added[i].cantidad}€</h2>
                    </div>
                    <div class="flex flex-col items-center">
                    <img class="w-4 sm:w-6 md:w-10" src="assets/icon/basura.png" alt="papelera" id="delete" data-id=${added[i].id} data-type="del">
                    </div>
                    </div>`;
    $show.appendChild($div);
  }
  const $div = document.createElement("div");
  $div.innerHTML = `<h1 id="total">Total: ${totalizer()}€`;
  $pay.appendChild($div);

  const divsAdd = document.querySelectorAll("#suma, #resta, #delete");
  console.log(divsAdd);
  for (let i = 0; i < divsAdd.length; i++) {
    divsAdd[i].addEventListener("click", () => {
      const type = divsAdd[i].dataset.type;
      if (type === "add") addProduct(parseInt(divsAdd[i].dataset.id), 1);
      if (type === "sub") addProduct(parseInt(divsAdd[i].dataset.id), -1);
      if (type === "del") deleteProduct(parseInt(divsAdd[i].dataset.id));
    });
  }
}
showCart();

function addProduct(id, valueQuantity) {
  const products = JSON.parse(localStorage.getItem("product"));
  const $subtotal = Array.from(document.querySelectorAll("#subtotal")).filter((stotal) => stotal.dataset.id == id);
  const $cantidad = Array.from(document.querySelectorAll("#cantidad")).filter((cantidad) => cantidad.dataset.id == id);
  for (const value of products) {
    if (id == value.id && value.cantidad + valueQuantity > 0) {
      value.cantidad = value.cantidad + valueQuantity;
      $subtotal[0].textContent = `${value.cantidad * value.precio}€`;
      $cantidad[0].textContent = `${value.cantidad}`;
    }
  }
  localStorage.setItem("product", JSON.stringify(products));
  const $total = document.querySelector("#total");
  $total.textContent = `Total: ${totalizer()}€`;
}

function deleteProduct(id) {
  const products = JSON.parse(localStorage.getItem("product"));
  const productsAlive = [];
  for (const value of products) {
    if (id != value.id) {
      productsAlive.push(value);
    }
  }

  localStorage.setItem("product", JSON.stringify(productsAlive));
  repaintCart();
}

$clearButton.addEventListener("click", () => {
  const carrito = [];
  localStorage.setItem("product", JSON.stringify(carrito));
  repaintCart();
});

function repaintCart() {
  // Eliminamos todas las líneas del html que muestran líneas de producto
  while ($show.firstChild) {
    $show.removeChild($show.firstChild);
  }
  $pay.removeChild($pay.firstChild);
  showCart();
}

function totalizer() {
  let res = 0;
  const products = JSON.parse(localStorage.getItem("product"));
  for (const value of products) {
    res = res + (value.cantidad * value.precio);
  }
  return res;
};

$stripe.addEventListener("click", () => {
  const lines = [];
  const products = JSON.parse(localStorage.getItem("product"));
  for (const value of products) {
    lines.push({ price: value.codigo, quantity: value.cantidad });
  }
  Stripe(KEYS.public)
    .redirectToCheckout({
      lineItems: lines,
      mode: "payment",
      successUrl: "https://curious-truffle-ce9ba8.netlify.app/success.html",
      cancelUrl: "https://curious-truffle-ce9ba8.netlify.app/cancel.html",
    })
    .then((res) => {
      if (res.error) {
        $stripe.insertAdjacentElement("afterend", res.error.message);
      }
    });
  const clearProducts = [];
  localStorage.setItem("product", JSON.stringify(clearProducts));
});
