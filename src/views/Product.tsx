import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../services/ProductService";
import ProductDetails from "../components/ProductDetails";
import type { ProductType } from "../types";

export async function loader() {
  const products = await getProducts();

  return {
    products,
  }; // al igual que los action se debe retornar algo
}

//action

export async function action({request}:ActionFunctionArgs){
  const data = Object.fromEntries(await request.formData())
  await updateAvailability(+data.id)
  return {}
}

const Product = () => {
  const {products} = useLoaderData() as {products:ProductType[]};// casteando el valor retornado

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Productos</h2>
        <Link
          className="rounded-md bg-indigo-600 text-sm font-bold text-white p-3 shadow-sm hover:bg-indigo-500"
          to={"/productos/nuevos"}
        >
          Agregar producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2">Producto</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Disponibilidad</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product)=>(
              <ProductDetails
              key={product.id}
              product={product}/>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Product;
