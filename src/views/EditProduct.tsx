import {
  Link,
  Form,
  useActionData,
  type ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import Error from "../components/Error";
import { getProductById, updateproduct } from "../services/ProductService";
import type { ProductType } from "../types";
import ProductForm from "../components/ProductForm";

//funcion para habilitar edicion desde la url
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      // throw new Response('',{status:404,statusText:'No Encontrado'})
      return redirect("/");
    }
    return product;
  }
}

// funcion para trabajar con action
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData()); // forma de obtener los valores del form
  // console.log(data)
  // validacion
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error; // al momento de retornar algo estara disponible en el Form de React-router-dom
  }
  //   console.log(params.id)
  if (params.id !== undefined) {
    await updateproduct(data, +params.id); // yase pasan los dos parametros
    // return{} // siempre se debe retornar algo
    return redirect("/");
  }
}

//disponibilidad
const availabilityOptions = [
  { name: "Disponible", value: true },
  { name: "No Disponible", value: false },
];

// inicio del componente
const EditProduct = () => {
  const error = useActionData() as string; // este hook nos permite recuperar los datos retornados desde la funcion de action
  //   const {state} = useLocation()

  // edicion
  //   console.log(state)// se vera el state que se paso con navLink en elm btn de details
  const product = useLoaderData() as ProductType;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
        <Link
          className="rounded-md bg-indigo-600 text-sm font-bold text-white p-3 shadow-sm hover:bg-indigo-500"
          to={"/"}
        >
          Volver a Productos
        </Link>
      </div>

      {error && <Error>{error}</Error>}
      <Form className="mt-10" method="post">
        <ProductForm product={product} />
         
        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Disponibilidad:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 bg-gray-50"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Guardar Cambios"
        />
      </Form>
    </>
  );
};

export default EditProduct;
