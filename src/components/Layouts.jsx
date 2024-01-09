    import { useState } from "react"
const Layouts = ({children,modal,modalAdd,addName}) => {
    
    //  modal gasto 
    const handlemodal = () => {
        modal(true)
    }
    // -----------------------------
    const handlemodalAdd = () => {
        modalAdd(true)
    }
    // --------------------------
    return(
        <div className=" ">
            <div className="h-48 md:h-36 w-full bg-slate-100 rounded-t-xl p-4 mb-2 flex flex-col md:flex-row gap-4 items-center justify-between">
                <button onClick={handlemodal} className="rounded-full p-1 w-20 h-20 bg-teal-400  font-semibold">Agregar</button>
                <div className="flex md:flex-col gap-2">
                    {/* <button onClick={handlemodalAdd} className="p-2 w-64 bg-teal-400 rounded-lg">{addName}</button>  */}
                    <button onClick={handlemodalAdd} className="p-2 w-64 bg-teal-400 rounded-lg">Agregar Banco</button>
                    {/* <button className="p-2 w-64 bg-teal-200 rounded-lg">Agregar Metodo de pago</button> */}
                </div>
            </div>

            {children}

        </div>
    )
}

export default Layouts