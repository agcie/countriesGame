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
  const [updating, setUpdating] = useState(false);
  const [idUpd, setIdUpd] = useState(0);

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

  const handleUpdate = (e:  React.FormEvent) => {
    e.preventDefault();
    axios.put(`${baseurl}languages/${idUpd.toString()}/`,
    {
      name: (name.toLowerCase()),
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
    console.log(vals);
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
          update: [x.id, x.name],
        }
      )
    })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'delete', headerName: 'Delete', width: 90, renderCell: (params) => 
    <Button size="small" onClick={(e: any) => {deleteLanguage(params.value)}} variant="contained"><DeleteIcon /></Button> },
    { field: 'update', headerName: 'Update', width: 90, renderCell: (params) => 
    <Button size="small" onClick={(e: any) => {handleClick(params.value)}} variant="contained">U</Button> },
  ];



  return (
    <div className="Language">
      <h1>Language</h1>
      {updating === false &&
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>}

      {updating === true &&
      <form onSubmit={handleUpdate}>
        <label> Name: <input type="text" value={name} onChange={handleChange}></input> </label>
        <input type="submit" value="Update" />
      </form>}

      <div style={{ height: 500, width: '76%' }}>
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