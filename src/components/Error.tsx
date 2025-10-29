import {type PropsWithChildren } from "react"



const Error = ({children}:PropsWithChildren) => {
  return (
    <div className="my-6 text-white bg-red-600 text-center font-bold p-3 uppercase rounded">{children}</div>
  )
}

export default Error