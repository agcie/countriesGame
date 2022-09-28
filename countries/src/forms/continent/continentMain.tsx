
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import IContinent from '../../api-ifc/IContinent';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ContinentMain = () => {
  const [continent, setContinent] = useState("");
  const [data, setData] = useState< IContinent[] >([]);

  const baseurl ="http://127.0.0.1:8000/";

  useEffect(() => {
    axios.get<IContinent>(`${baseurl}continents`)
    .then((response : AxiosResponse)  =>
    {
        setData(response.data);
        console.log(response);
    } )
    .catch(console.error);
  }, []);

  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    console.log(continent)
    axios.post(`${baseurl}continents/`,
      {
        name: continent
      }
    )
    .then((respone) => console.log(respone))
    .catch((err) => console.log(err))
  }

  const handleChange= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setContinent(e.currentTarget.value)
  }

  const deleteContinent = (id: number) =>{
    console.log("deleting", `${baseurl}continents/`+id.toString())
    axios.delete("http://127.0.0.1:8000/continents/"+id.toString())
  }
  const [selected, setSelected] = useState(1);


  const rows = 
        data.map((x: IContinent) => 
          {
            return (
              {
                id: x.id,
                name: x.name,
                delete: x.id,
              }
            )
          })

  const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 30 },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'delete', headerName: 'Delete', width: 100, renderCell: (params) => 
  <Button size="small" onClick={(e: any) => {deleteContinent(params.value)}} variant="contained"><DeleteIcon /></Button> },
  ];

  return (
    <div className="Continent">
      <h1>Continents</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>

      <div style={{ height: 500, width: '45%' }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={10}
          />
          </div>
    </div>
  );
}

export default ContinentMain;