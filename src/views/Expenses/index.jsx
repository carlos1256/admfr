import { useEffect, useState } from "react"
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import Form from "../../components/Form"
import {deleteCol, fetchUpdatedData} from "../../components/GeneralFuntion"
import Layouts from "../../components/layouts"
function Expenses() {
const expenditureinit = {
    expenditure: '',
    methodofpay: '',
    bank_id: '',
    total: ''
}
const bankinit = {
    bank:''
}
    // estados
    const [modalSave, setmodalSave] = useState(false)
    const [modalBank, setmodalBank] = useState(false)
    const [bank, setbank] = useState([])
    const [formData, setFormData] = useState(bankinit)
    const [forDataExpenditure, setformDataExpenditure] = useState(expenditureinit)
    const [updateTable, setUpdateTable] = useState(false)
    const [iddelete, setiddelete] = useState(0)
    
    // ------------
    
    const data = [
        'Gasto',
        'Banco',
        'Tipo de pago',
        'Total',
        'Fecha'
    ]
    // input value
    const hadleinputValue = (form, setform) => (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
    };

    // Para los campos de selección
    const handleSelectChange = (field) => (e) => {
        setformDataExpenditure({
            ...forDataExpenditure,
            [field]: e.target.value,
        });
    }
    // -----------------


    // --------------------------

    // Agregar gasto


    // ---------------------

    // Mostrar bancos registrados
    useEffect(() => {
        fetch('http://localhost:8000/api/bank')
            .then(res => res.json())
            .then(data => setbank(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [])
    // -----------------------

    // limpiar campos formulario
    const formBlank = (setForm) => {
        setForm((prevForm) => {
            if (prevForm === formData) {
                return bankinit;
            } else if (prevForm === forDataExpenditure) {
                return expenditureinit;
            }
            return prevForm;
        });
    };
    
    // --------------
    return (
        <Layouts modal={setmodalSave} modalAdd={setmodalBank} addName="Agregar Gasto">
                <div className="w-full bg-slate-100">
                <Table datatitle={data} url='expenditure' uptable={updateTable} setupdate={setUpdateTable} urldel='expenditure/del'></Table>
            </div>
            
            <Modal title='Agregar Gasto' name={modalSave} close={setmodalSave} >
                <Form url="expenditure/save" uptable={setUpdateTable} dataforms={forDataExpenditure} update={setformDataExpenditure}  formBlank={() => formBlank(setformDataExpenditure)}>
                    <input autoComplete="off" type="text" name="expenditure" value={forDataExpenditure.expenditure} className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="Haraina, Pan, Pollo, ........." onChange={hadleinputValue(forDataExpenditure, setformDataExpenditure)} />
                    <select name="methodofpay" className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white" onChange={handleSelectChange("methodofpay")} id="">
                       <option disabled selected>Metodo de pago</option>    
                        <option value="Pago Movil">Pago Movil</option>
                        <option value="Punto">Punto</option>
                        <option value="Efectivo">Efectivo</option>
                        <option value="Dolar">Dolar</option>
                        <option value="Transferencia">Transferencia</option>
                        <option value="Consumo N">Consumo N</option>

                    </select>
                    <select name="bank_id" className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white" onChange={handleSelectChange("bank_id")} id="">
                    <option disabled selected>Banco</option>    
                        {bank.map((banks) => (
                            <option value={banks.id} key={banks.id}>{banks.bank}</option>
                        ))}
                    </select>
                    <input onChange={hadleinputValue(forDataExpenditure, setformDataExpenditure)} name="total" value={forDataExpenditure.total} type="number" className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="100" />
                </Form>
            </Modal>

            <Modal title='Agregar Banco' name={modalBank} close={setmodalBank} >
                <Form url='bank/save/' dataforms={formData} update={setbank} formBlank={() => setFormData(bankinit)}  upurl='bank'>
                    <input autoComplete="off" type="text" onChange={hadleinputValue(formData, setFormData)} name="bank" value={formData.bank} className="bg-teal-400 mt-8 w-full h-10 rounded-md p-2 pl-2 text-white placeholder-white font-medium" placeholder="Bancamiga" />
                </Form>

                <h5 className="mt-6 text-red-500 font-semibold mb-2 text-center">Eliminar Banco</h5>
                <div className="flex h-12p-1  items-center gap-2 ">
                    <select name=""  onChange={(e)=>setiddelete(e.target.value)} className=" w-[70%] bg-teal-400 p-2 h-full rounded-md  pl-2 text-white" id="bank">
                        {bank.map(item => (
                            <option key={item.id} value={item.id}>{item.bank}</option>
                        ))}
                    </select>
                    <button onClick={() =>deleteCol('bank/del',iddelete,setbank,'bank',setiddelete)} className="p-2 bg-red-500 h-full rounded-lg w-[30%] text-white">Borrar</button>
                </div>
            </Modal>
        </Layouts>
    )
}

export default Expenses