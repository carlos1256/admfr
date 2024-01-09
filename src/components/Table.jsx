import React, { useEffect, useState } from "react";
import {fetchUpdatedData , deleteCol} from "./GeneralFuntion";

const Table = ({ datatitle, url, setupdate, uptable,urldel }) => {
  const [DataTable, setDataTable] = useState([]);
  const Url = 'http://localhost:8000/api/' + url;
  if (uptable === true) {
    if (fetchUpdatedData(url, setDataTable)) {
      setupdate(false)
    }
  }
  useEffect(() => {
    fetch(Url)
      .then(res => res.json())
      .then(data => setDataTable(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);



const [dateSearch,setdateSearch] = useState({
  dateOne: '',
  dateTwo: ''

})
// input value
const hadleinputValue = (e) => {
  setdateSearch({
      ...dateSearch,
      [e.target.name]: e.target.value,
  })
};

useEffect(() => {
  // Solo ejecuta la búsqueda si ambas fechas están definidas en dateSearch
  if (dateSearch.dateOne && dateSearch.dateTwo) {
    fetch(`${Url}/search/${dateSearch.dateOne}/${dateSearch.dateTwo}`)
      .then(res => res.json())
      .then(data => setDataTable(data))
      .catch(error => console.error('Error fetching data:', error));
  }
}, [dateSearch.dateOne, dateSearch.dateTwo, Url]);
  
  return (
    <div className="bg-slate-100 md:px-4 overflow-x-scroll">
      <div className="mb-5 mt-2 flex items-center gap-2">
          <h5 className="font-bold">Filtrar</h5>
          <label>Desde: </label><input type="date" name="dateOne" onChange={hadleinputValue} value={dateSearch.dateOne} className="border-2 p-1 rounded-md mr-4"/>
          <label>Hasta: </label><input type="date" name="dateTwo" onChange={hadleinputValue} value={dateSearch.dateTwo} className="border-2 p-1 rounded-md mr-4"/>
          {/* <button type="submit" className="bg-teal-300 p-1 px-3 rounded-lg">Filtrar</button> */}
      </div>
      <table className="w-full">
        <thead>
          <tr className="">
            <th className="border-2 border-green-300">Id</th>
            {datatitle.map((item, index) => (
              <th key={index} className="border-2 border-green-300 ">
                {item}
              </th>
            ))}
            <th className="border-2 border-green-300 col-span-2">Accion</th>
          </tr>
        </thead>
        <tbody>
          {DataTable.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(item).map((dynamicKeyName, cellIndex) => (
                <td key={cellIndex} className="border-2 text-center">
                  <div className="">
                    <div className="">
                      {/* <img src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/img-49-new.jpg" className="w-[50px] h-[50px] inline-block shrink-0 rounded-2xl" alt="" /> */}
                    </div>
                    <div className="">
                      <a href="" className="">
                      {dynamicKeyName === 'created_at' ? new Intl.DateTimeFormat("es-ES", { year: 'numeric', month: 'long', day: "numeric" }).format(new Date(item[dynamicKeyName])) : item[dynamicKeyName]}
                      </a>
                    </div>
                  </div>
                </td>
              ))}
              <td className="border-2 p-2">
                <button onClick={() => deleteCol(urldel,item.id,setDataTable,url)} className="bg-red-300 p-1 w-full mt-2 rounded-lg">Bor</button>
                {/* <button className="bg-green-300 p-1 w-full mt-2 rounded-lg">Edit</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
