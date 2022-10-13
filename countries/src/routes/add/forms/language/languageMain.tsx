import axios, {AxiosResponse} from 'axios';
import React, { useState, useEffect } from 'react';
import ILanguage from '../../api-ifc/ILanguage';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const baseurl ="http://127.0.0.1:8000/";


const LanguageMain = () => {

  // const [language, setLanguage] = useState("");

  const [name, setName] = useState("");
  const [data, setData] = useState< ILanguage[] >([]);

  useEffect(() => {
    axios.get<ILanguage>(`${baseurl}languages`)
    .then((response : AxiosResponse)  =>
    {
        setData(response.data);
        console.log(response);
    } )
    .catch(console.error);
  }, []);

  const deleteLanguage = (id: number) =>{
    console.log("deleting", `${baseurl}languages/`+id.toString())
    axios.delete(`${baseurl}languages/`+id.toString())
  }


  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    axios.post(`${baseurl}languages/`,
      {
        name: (name.toLowerCase())
      }
    )
  }

  const handleChange= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.currentTarget.value)
  }


  const rows = 
    data.map((x: ILanguage) => 
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
    <Button size="small" onClick={(e: any) => {deleteLanguage(params.value)}} variant="contained"><DeleteIcon /></Button> },
  ];



  return (
    <div className="Language">
      <h1>Language</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>

      <div style={{ height: 500, width: '45%' }}>
          <DataGrid 
            rows={rows} 
            columns={columns} 
            rowsPerPageOptions={[0]}
          />
      </div>

    </div>
  );
}

export default LanguageMain;