
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICurrency from '../../api-ifc/ICurrency';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const rows = 
    data.map((x: ICurrency) => 
    {
      return (
        {
          id: x.id,
          name: x.name,
          symbol: x.symbol,
          subunit: x.subunit,
          code: x.code,
          delete: x.id,
        }
      )
    })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    { field: 'subunit', headerName: 'Subunit', width: 100 },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'delete', headerName: 'Delete', width: 100, renderCell: (params) => 
      <Button size="small" onClick={(e: any) => {deleteCurrency(params.value)}} variant="contained"><DeleteIcon /></Button> },
  ];


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

      <div style={{ height: 500, width: '60%' }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={10}
          />
      </div>

          
    </div>
  );
}

export default CurrencyMain;