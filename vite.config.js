import { resolve } from "path";

const mode = process.env.NODE_ENV;
const base = "/";
export default {
  root: "src",
  base,
  mode,
  publicDir: "../public",
  build: {
    rollupOptions: {
      input: {
        main: resolve("src/index.html"),
        construction: resolve("src/construccion.html"),
        carrito: resolve("src/cart.html"),
        listaproductos: resolve("src/productList.html"),
        detalles: resolve("src/details.html"),
        info: resolve("src/info.html"),
        success: resolve("src/success.html"),
        cancel: resolve("src/cancel.html")
      },
    },
    outDir: "../dist",
    assetsDir: "./"
  }
};
