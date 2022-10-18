
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
  const [updating, setUpdating] = useState(false);
  const [idUpd, setIdUpd] = useState(0);

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
        name: (name.toLowerCase()),
        subunit: (subunit.toLowerCase()),
        code: (code.toUpperCase()),
        symbol: symbol,
      }
    )
    .then((respone) => console.log(respone))
    .catch((err) => console.log(err))
  }

  const handleUpdate = (e:  React.FormEvent) => {
    e.preventDefault();
    axios.put(`${baseurl}currencies/${idUpd.toString()}/`,
    {
      name: (name.toLowerCase()),
      subunit: (subunit.toLowerCase()),
      code: (code.toUpperCase()),
      symbol: symbol,
    }
    )
    .then((response) => console.log(response))
    .catch((err) => console.log(err))
  }

  const handleClick = (vals: any) =>
  {
    setUpdating(true);
    setIdUpd(vals[0]);
    setName(vals[1]);
    setSymbol(vals[2]);
    setSubunit(vals[3]);
    setCode(vals[4]);
    console.log(vals);
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
          update: [x.id, x.name, x.symbol, x.subunit, x.code],
        }
      )
    })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    { field: 'subunit', headerName: 'Subunit', width: 100 },
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'delete', headerName: 'Delete', width: 90, renderCell: (params) => 
      <Button size="small" onClick={(e: any) => {deleteCurrency(params.value)}} variant="contained"><DeleteIcon /></Button> },
    { field: 'update', headerName: 'Update', width: 90, renderCell: (params) => 
      <Button size="small" onClick={(e: any) => {handleClick(params.value)}} variant="contained">U</Button> },
  ];


  return (
    <div className="Currency">
      <h1>Currency </h1>
      {updating === false &&
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChangeName}></input> </label>
        <label> Symbol: <input type="text" onChange={handleChangeSymbol}></input> </label>
        <label> Subunit: <input type="text" onChange={handleChangeSubnit}></input> </label>
        <label> Code: <input type="text" onChange={handleChangeCode}></input> </label>
        <input type="submit" value="Submit" />
      </form>}

      {updating &&
      <form onSubmit={handleUpdate}>
        <label> Name: <input type="text" value={name} onChange={handleChangeName}></input> </label>
        <label> Symbol: <input type="text" value={symbol} onChange={handleChangeSymbol}></input> </label>
        <label> Subunit: <input type="text" value={subunit} onChange={handleChangeSubnit}></input> </label>
        <label> Code: <input type="text" value={code} onChange={handleChangeCode}></input> </label>
        <input type="submit" value="Update" />
      </form>}

      <div style={{ height: 500, width: '70%' }}>
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