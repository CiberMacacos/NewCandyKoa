const isCart = JSON.parse(localStorage.getItem("product"));
if (isCart == null) {
  const cart = [];
  localStorage.setItem("product", JSON.stringify(cart));
}

const $recomended = document.querySelector("#recomended");

async function indexCards() {
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
indexCards();

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
