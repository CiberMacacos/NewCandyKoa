export async function getData() { // esta función es la que extrae los datos del json
  const res = await fetch("./assets/products.json");
  const json = await res.json();
  return json;
}
