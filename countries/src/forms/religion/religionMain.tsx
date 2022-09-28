import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import IReligion from '../../api-ifc/IReligion';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const baseurl ="http://127.0.0.1:8000/";

const ReligionMain = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState< IReligion[] >([]);

  useEffect(() => {
    axios.get<IReligion>(`${baseurl}religions`)
    .then((response : AxiosResponse)  =>
    {
        setData(response.data);
        console.log(response);
    } )
    .catch(console.error);
  }, []);

  const deleteReligion = (id: number) =>{
    console.log("deleting", `${baseurl}religions/`+id.toString())
    axios.delete(`${baseurl}religions/`+id.toString())
  }

  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    axios.post(`${baseurl}religions/`,
      {
        name: name,
        description: description,
      }
    )
    .then((respone) => console.log(respone))
    .catch((err) => console.log(err))
  }

  const handleChangeName= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.currentTarget.value)
  }
  const handleChangeDesc= (e:  any) =>{
    setDescription(e.currentTarget.value)
  }


  const rows = 
    data.map((x: IReligion) => 
    {
      return (
        {
          id: x.id,
          name: x.name,
          description: x.description,
          delete: x.id,
        }
      )
    })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'delete', headerName: 'Delete', width: 100, renderCell: (params) => 
      <Button size="small" onClick={(e: any) => {deleteReligion(params.value)}} variant="contained"><DeleteIcon /></Button> },
  ];




  
  return (
    <div className="Religion">
      <h1>Religion</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChangeName}></input> </label>
        <label> Description: <textarea  onChange={handleChangeDesc}></textarea> </label>

        <input type="submit" value="Submit" />
      </form>
      
      <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={rows} 
            columns={columns}
            rowsPerPageOptions={[0]}
          />
      </div>

    </div>
  );
}

export default ReligionMain;