import type { ProductType } from "../types";
import { formatCurrency } from "../helpers";
import { useNavigate, Form, type ActionFunctionArgs, redirect, useFetcher } from "react-router-dom";
import  { deleteProduct } from "../services/ProductService";

type ProductDeatilsProps = {
  product: ProductType;
};


// action para obtener los datos del form de eliminar 
export async function action({params}:ActionFunctionArgs){
  // console.log('desde accion', params.id)
  if(params.id !== undefined){
    await deleteProduct(+params.id)
    return redirect('/')

  }
}

const ProductDetails = ({ product }: ProductDeatilsProps) => {
  const fetcher = useFetcher()
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">


        <fetcher.Form method="POST">
          <button 
          type="submit"
          name="id"
          value={product.id}
          className={`${isAvailable?'text-black':'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full
          border border-black hover:cursor-pointer`}>
           
            {isAvailable ? "Disponible" : "No disponible"}

          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            onClick={() => navigate(`/productos/${product.id}/editar`)}
          >
            Editar
          </button>
          {/* <Link classNameName="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center" to={`/productos/${product.id}/editar`}>Editar</Link> */}
          <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`}
          onSubmit={(e)=>{
              if(!confirm('Eliminar')){
                e.preventDefault()
              }
          }}>
            <input type="submit" 
            value={"Borrar"} 
            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"/>
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
