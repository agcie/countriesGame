
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICurrency from '../../api-ifc/ICurrency';

const baseurl ="http://127.0.0.1:8000/";

const CurrencyMain = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [subunit, setSubunit] = useState("");
  const [data, setData] = useState< ICurrency[] >([]);

  useEffect(() => {
    axios.get<ICurrency>(`${baseurl}currencies`)
    .then((response : AxiosResponse)  =>
    {
        setData(response.data);
        console.log(response);
    } )
    .catch(console.error);
  }, []);


  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    axios.post(`${baseurl}currencies/`,
      {
        name: name,
        subunit: subunit,
        code: code,
        symbol: symbol
      }
    )
    .then((respone) => console.log(respone))
    .catch((err) => console.log(err))
  }

  const handleChangeName= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.currentTarget.value)
  }
  const handleChangeCode= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setCode(e.currentTarget.value)
  }
  const handleChangeSubnit= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setSubunit(e.currentTarget.value)
  }
  const handleChangeSymbol= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setSymbol(e.currentTarget.value)
  }
  const deleteCurrency = (id: number) =>{
    console.log("deleting", `${baseurl}currencies/`+id.toString())
    axios.delete("http://127.0.0.1:8000/currencies/"+id.toString())
  }


  return (
    <div className="Currency">
      <h1>Currency </h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChangeName}></input> </label>
        <label> Symbol: <input type="text" onChange={handleChangeSymbol}></input> </label>
        <label> Subunit: <input type="text" onChange={handleChangeSubnit}></input> </label>
        <label> Code: <input type="text" onChange={handleChangeCode}></input> </label>
        <input type="submit" value="Submit" />
      </form>

          {
            data.map(({id, name, code, symbol, subunit}: ICurrency) => 
            {
              return (
                <p id={id.toString()}>
                  {name} , {symbol}, {code}, {subunit} <button onClick={(e: any) => {deleteCurrency(id)}}>Delete</button>
                </p>)
            })
          }
    </div>
  );
}

export default CurrencyMain;