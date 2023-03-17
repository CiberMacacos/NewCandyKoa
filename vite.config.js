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
        carrito: resolve("src/carrito.html"),
        listaproductos: resolve("src/listaproductos.html"),
        detalles: resolve("src/detalle.html"),
        info: resolve("src/info.html"),
        success: resolve("src/success.html"),
        cancel: resolve("src/cancel.html")
      },
    },
    outDir: "../dist",
    assetsDir: "./"
  }
};
