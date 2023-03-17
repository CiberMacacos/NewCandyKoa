export function updatePrice() {
  let finalPrice = 0;
  const priceTag = document.querySelectorAll("#itemPrice");
  const totalize = document.querySelector("#totalize");
  const data = JSON.parse(localStorage.getItem("product"));

  for (let i = 0; i < data.length; i++) {
    const amountHtml = document.querySelector(`#amount-${+i}`);
    const itemPrice = (data[i].precio * amountHtml.textContent);
    finalPrice += (data[i].precio * data[i].cantidad);

    priceTag[i].innerHTML = `${itemPrice} €`;
  }

  totalize.innerHTML = `Subtotal: ${finalPrice} €`;
}
