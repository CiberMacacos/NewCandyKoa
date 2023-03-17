export function totalItems() {
  let countItems = 0;
  const totalItemsP = document.querySelector("#totalItems");
  const data = JSON.parse(localStorage.getItem("product"));
  for (let i = 0; i < data.length; i++) {
    countItems += data[i].cantidad;
  }
  totalItemsP.innerHTML = `Productos: ${countItems}`;
}
