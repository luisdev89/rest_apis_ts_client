import {object, string, number, boolean, array} from 'valibot'
import type { InferOutput } from 'valibot'

export const draftProductSchema = object({
   name: string(),
   price:number()
})

// para los datos que vienen de la bd 
export const productSchema = object({
   id:number(),
   availability: boolean(),
   name:string(),
   price:number(),

})

export const ProductsSchema = array(productSchema)

export type ProductType = InferOutput<typeof productSchema>
