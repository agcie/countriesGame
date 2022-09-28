import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICity from '../../api-ifc/ICity';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const baseurl ="http://127.0.0.1:8000/";

const CityMain = () => {

  const [name, setName] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [population, setPopulation] = useState(0);

  const [data, setData] = useState< ICity[] >([]);

  useEffect(() => {
    axios.get<ICity>(`${baseurl}cities`)
    .then((response : AxiosResponse)  =>
    {
        setData(response.data);
        console.log(response);
    } )
    .catch(console.error);
  }, []);

  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    axios.post(`${baseurl}cities/`,
      {
        name: name,
        population: population,
        latitude: latitude,
        longitude: longitude
      }
    )
    .then((respone) => console.log(respone))
    .catch((err) => console.log(err))
  }

  const handleChangeName= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.currentTarget.value)
  }
  const handleChangeLatitude= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setLatitude(e.currentTarget.value)
  }
  const handleChangeLongitude= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setLongitude(e.currentTarget.value)
  }
  const handleChangePopulation= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setPopulation(Number(e.currentTarget.value))
  }

  const deleteCity = (id: number) =>{
    axios.delete( `${baseurl}cities/`+id.toString())
  }

  const rows = 
    data.map((x: ICity) => 
    {
      return (
        {
          id: x.id,
          name: x.name,
          longitude: x.longitude,
          latitude: x.latitude,
          population: x.population,
          delete: x.id,
        }
      )
    })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'longitude', headerName: 'Longitude', width: 100 },
    { field: 'latitude', headerName: 'Latitude', width: 100 },
    { field: 'population', headerName: 'Population', width: 100 },
    { field: 'delete', headerName: 'Delete', width: 100, renderCell: (params) => 
      <Button size="small" onClick={(e: any) => {deleteCity(params.value)}} variant="contained"><DeleteIcon /></Button> },
  ];

  return (
    <div className="City">
      <h1>City</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChangeName}></input> </label>
        <label> longitude: <input type="text" onChange={handleChangeLongitude}></input> </label>
        <label> latitude: <input type="text" onChange={handleChangeLatitude}></input> </label>
        <label> population: <input type="number" onChange={handleChangePopulation}></input> </label>
        <input type="submit" value="Submit" />
      </form>
      
      <div style={{ height: 500, width: '60%' }}>
          <DataGrid 
            rows={rows} 
            columns={columns}
            rowsPerPageOptions={[0]}
          />
      </div>

    </div>
  );
}

export default CityMain;