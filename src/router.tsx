import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Product from "./views/Product";
import NewProduct, {action as newProductAction} from "./views/NewProduct";
import { loader as productsLoader } from "./views/Product";
import EditProduct from "./views/EditProduct";
import { loader as editProduct, action as editProductaction} from "./views/EditProduct";
import{action as ProductDetailsAction} from './components/ProductDetails'
import { action as updateAvailability } from "./views/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [// aqui van las rutas hijas del layout ppal este layout se renderizara en todas las rutas
      {
        index: true,
        element: <Product/>,
        loader:productsLoader,
        action:updateAvailability,
        hydrateFallbackElement: <p>Cargando...</p>// esto sera mostrado mientras carga la pag de productos
      },
      {
        path: "productos/nuevos",
        element: <NewProduct />,
        action:newProductAction // comunicandose con la funcion de newProduct
      },
      {
        path:'productos/:id/editar',//ROA pattern Resource Oriented Design
        element: <EditProduct/>,
        loader: editProduct,
        action:editProductaction
      },
      {
        path:'productos/:id/eliminar',
        action:ProductDetailsAction
      }
    ],
  },
]);

// en este router se declaran las rutas en un arreglo y se definen en un objeto
