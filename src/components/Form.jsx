import { useEffect,useState } from "react";
import {fetchUpdatedData} from "./GeneralFuntion";
const Form = ({ url,children,dataforms,update,formBlank,uptable,upurl }) => {
    
    const [sendBUtton,setsendbutton] = useState(false)
    const banksend = async (e) => {
        e.preventDefault()
        try {
            setsendbutton(true);
            const response = await fetch('http://localhost:8000/api/'+url, {
                method: 'POST',
                body: JSON.stringify(dataforms),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });
    
            if (response.ok) {
                formBlank()
                if (uptable) {
                    uptable(true)
                }
                fetchUpdatedData(upurl,update)
                setsendbutton(false);
            } else {
                console.error('Error:', response.statusText);
                // Handle the error appropriately (show a message to the user, etc.)
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // Handle the error appropriately
        }
    };
    return (
        <form onSubmit={banksend}>
                {children}
                <button className="bg-green-200 p-2  mt-4  rounded-lg" onClick={banksend} type="submit">enviarrrr</button>
        </form>
    )
}

export default Form