export function formatCurrency(amount:number){
  return new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:"USD"
  }).format(amount)
}

export function toBoolean(str:string){
  return str.toLowerCase() === 'true'
  // simple esta funcion retornara tru o false 
}