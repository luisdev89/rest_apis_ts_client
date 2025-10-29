import { draftProductSchema,productSchema, ProductsSchema, type ProductType} from "../types";
import { safeParse,pipe, transform, string, number, parse  } from "valibot";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
  [k: string]: FormDataEntryValue;
};
export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(draftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      // si se pasa la validacion se envia comienza a organizar para enviar la data a el servidor
      const url = `${import.meta.env.VITE_API_URL}/api/products`
      // const url = "http://localhost:4000/api/products";
      await axios.post(url, {
        // datos validados con valibot
        name: result.output.name,
        price: result.output.price,
      });
      

      // otra forma de hacer la peticion post

      // const {data} = await axios(url, {
      //     method: "POST"
      // })
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts(){
  try {
    // llamdo hacia la api 
    const url = `${import.meta.env.VITE_API_URL}/api/products`
    const {data} =  await axios(url)
    const result = safeParse(ProductsSchema, data.data)
   if(result.success){
    return result.output// datos satinizados
   }else{
    throw new Error('Hubo un error al obtener los datos')
   }

  } catch (error) {
    console.log(error)
  }
}


// obtner un producto por id para la edicion 
export async function getProductById(id:ProductType['id']){
  try {
    // llamdo hacia la api 
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
    const {data} =  await axios(url)
    const result = safeParse(productSchema, data.data)
    
   if(result.success){
    return result.output// datos satinizados
   }else{
    throw new Error('Hubo un error al obtener los datos')
   }

  } catch (error) {
    console.log(error)
  }
}

export async function updateproduct(data:ProductData, id:ProductType['id'] ){
 try {
  const NumberSchema = pipe(string(), transform(Number), number());
  const result = safeParse(productSchema,{
    id,
    name: data.name,
    price: parse(NumberSchema, data.price),
    availability: toBoolean(data.availability.toString())// se convierte a dtring porqu es un tipo  FormValue
  })
  if(result.success){
    // se actualiza el producto 
     const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
     await axios.put(url, result.output)

  }
 } catch (error) {
  console.log(error)
 }
}

export async function deleteProduct(id:ProductType['id']){
  try {
     const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
     await axios.delete(url)// en este caso de delete solo le pasamos la url que tiene el id 
  } catch (error) {
    console.log(error)
  }
}

export async function updateAvailability(id:ProductType['id']){
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
     await axios.patch(url)
  } catch (error) {
    console.log(error)
  }
}
