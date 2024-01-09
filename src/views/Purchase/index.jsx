import Layouts from "../../components/layouts"
import { useState,useEffect } from "react"
import Modal from "../../components/Modal"
import Form from "../../components/Form"
import Table from "../../components/Table"
import {fetchUpdatedData,deleteCol} from "../../components/GeneralFuntion"

function Purchase(){
    const formsupplier = {
        supplier:'',
        product:''
    }
    const formPurchase={
        purchase:'',
        methodofpay:'',
        bank_id:'',
        supplier_id:'',
        total:'',
        comment:''
    }
    const [modalSave, setmodalSave] = useState(false)
    const [modalPurchase, setmodalPurchase] = useState(false)
    const [iddelete, setiddelete] = useState(0)
    const [supplier,setsupplier] = useState([])
    const [dataformSupplier,setdataformSupplier] = useState(formsupplier)
    const [dataformPurchase,setdataformPurchase] = useState(formPurchase)
    const [bank, setbank] = useState([])
    const[uptable,setuptable] = useState(false)
    const data = [
        'Proveedor',
        'Banco',
        'Met. Pago',   
        'total',
        'Fecha'
    ]

        // limpiar campos formulario
        const formBlank = (setForm) => {
            setForm((prevForm) => {
                if (prevForm === dataformSupplier ) {
                    return formsupplier;
                } else if (prevForm === forDataExpenditure) {
                    return expenditureinit;
                }
                return prevForm;
            });
        }
    useEffect(() => {
        fetch('http://localhost:8000/api/supplier')
            .then(res => res.json())
            .then(data => setsupplier(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])
    const hadleinputValue = (form, setform) => (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
    };
   
       // Para los campos de selección
       const handleSelectChange = (set,formdata,field) => (e) => {
        set({
            ...formdata,
            [field]: e.target.value,
        });
    }
    // -----------------
    // Mostrar bancos registrados
    useEffect(() => {
        fetch('http://localhost:8000/api/bank')
            .then(res => res.json())
            .then(data => setbank(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])
    // -----------------------
    console.log(dataformPurchase)
    return(
        <Layouts modal={setmodalSave} modalAdd={setmodalPurchase} addName='Agregar Proveedor'>
            <div className="w-full bg-slate-100">
                <Table datatitle={data} url='purchase' setupdate={setuptable} uptable={uptable} urldel='purchase/del' urlsearch='' ></Table>
            </div>
             <Modal title="Agregar Compra" name={modalSave} close={setmodalSave}>
                <Form url='purchase/save' dataforms={dataformPurchase} uptable={setuptable} upurl='purchase/0/0'  formBlank={() => setdataformPurchase(formPurchase)}>
                <input autoComplete="off" type="text" onChange={hadleinputValue(dataformPurchase ,setdataformPurchase)} name="purchase" value={dataformPurchase.purchase} className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="Compra" />
                <select name="methodofpay" className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white" onChange={handleSelectChange(setdataformPurchase,dataformPurchase,"methodofpay")} id="">
                       <option disabled selected>Metodo de pago</option>    
                        <option value="Pago Movil">Pago Movil</option>
                        <option value="Punto">Punto</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Dolar">Dolar</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Consumo N">Consumo N</option>
                </select>
                <select name="bank_id" className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white" onChange={handleSelectChange(setdataformPurchase,dataformPurchase,"bank_id")} id="">
                    <option disabled selected>Banco</option>    
                        {bank.map((banks) => (
                            <option value={banks.id} key={banks.id}>{banks.bank}</option>
                        ))}
                    </select>
                    <select name="supplier_id" className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white" onChange={handleSelectChange(setdataformPurchase,dataformPurchase,"supplier_id")} id="">
                    <option disabled selected>Proveedor</option>    
                        {supplier.map(item => (
                            <option key={item.id} value={item.id}>{item.supplier} </option>
                        ))}
                    </select>
                <input autoComplete="off" type="number" onChange={hadleinputValue(dataformPurchase ,setdataformPurchase)} name="total" value={dataformPurchase.total} className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="Total" />
                <textarea cols="30" rows="10" name="comment" value={dataformPurchase.comment} onChange={hadleinputValue(dataformPurchase ,setdataformPurchase)}  className="bg-teal-400 mt-8 w-full h-14 rounded-md p-2 pl-2 text-white placeholder-white" placeholder="Comentario"></textarea>
                </Form>
             </Modal>
             <Modal title="Agregar Proveedor" name={modalPurchase} close={setmodalPurchase}>
              <Form url='supplier/save/' dataforms={dataformSupplier} update={setsupplier} upurl='supplier' formBlank={() => setdataformSupplier(formsupplier)}>
                    <input autoComplete="off" type="text" onChange={hadleinputValue(dataformSupplier ,setdataformSupplier)} name="supplier" value={dataformSupplier.supplier} className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="Proveedor" />
                    <input autoComplete="off" type="text" onChange={hadleinputValue(dataformSupplier ,setdataformSupplier)} name="product" value={dataformSupplier.product} className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="Categoria" />
                </Form> 

                <h5 className="mt-6 text-red-500 font-semibold mb-2 text-center">Eliminar Proveedor</h5>
                <div className="flex h-12p-1  items-center gap-2 ">
                    <select name=""  onChange={(e)=>setiddelete(e.target.value)} className=" w-[70%] bg-teal-400 p-2 h-full rounded-md  pl-2 text-white" id="supplier">
                        <option disabled selected>Proveedores</option>
                        {supplier.map(item => (
                            <option key={item.id} value={item.id}>{item.supplier} </option>
                        ))}
                    </select>
                    <button onClick={() => deleteCol('supplier/del',iddelete,setsupplier,'supplier',setiddelete)} className="p-2 bg-red-500 h-full rounded-lg w-[30%] text-white">Borrar</button> 
             </div>
             </Modal>
        </Layouts>
    )
}

export default Purchase