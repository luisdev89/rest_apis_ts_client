import { Link, Form, useActionData, type ActionFunctionArgs, redirect} from "react-router-dom";
import Error from "../components/Error";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";


// funcion para trabajar con action
export async function action({request}:ActionFunctionArgs){
    const data =  Object.fromEntries( await request.formData())// forma de obtener los valores del form
    // console.log(data)
    // validacion 
    let error = ''
    if(Object.values(data).includes('')){
        error = "Todos los campos son obligatorios"
    }
    if(error.length){
        return error // al momento de retornar algo estara disponible en el Form de React-router-dom
    }
     await addProduct(data)
    // return{} // siempre se debe retornar algo
    return (redirect('/'))
}
const NewProduct = () => {
  const error = useActionData() as string// este hook nos permite recuperar los datos retornados desde la funcion de action
  

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">Agregar Producto</h2>
        <Link
          className="rounded-md bg-indigo-600 text-sm font-bold text-white p-3 shadow-sm hover:bg-indigo-500"
          to={"/"}
        >
          Volver a Productos
        </Link>
      </div>
      

      {error && <Error>{error}</Error>}
      <Form className="mt-10" method="post">
       <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

export default NewProduct;
