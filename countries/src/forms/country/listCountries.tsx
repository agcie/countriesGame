import axios, { AxiosResponse } from 'axios';
import { dirxml } from 'console';
import React, { useEffect, useState } from 'react';
import ICountry from '../../api-ifc/ICountry';
import ILanguage from '../../api-ifc/ILanguage';
import IReligion from '../../api-ifc/IReligion';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



const baseurl ="http://127.0.0.1:8000/";

//tbd: type of  country

const ListCountries = () => {

    const [data, setData] = useState< ICountry[] >([]);

    useEffect(() => {
        axios.get<ICountry>(`${baseurl}countries/list`)
        .then((response : AxiosResponse)  =>
        {
            setData(response.data);
            console.log(response);
        } )
        .catch(console.error);
      }, []);

      const deleteCountry = (id: number) =>{
        console.log("deleting", `${baseurl}countries/`+id.toString())
        axios.delete("http://127.0.0.1:8000/countries/"+id.toString())
      }


      const rows = 
        data.map((x: ICountry) => 
          {
            return (
              {
                id: x.id, 
                name: x.name, 
                full_name: x.full_name,
                capital_city: x.capital_city.name,
                continent: x.continent.name,
                language: [x.language.map((y: ILanguage) => y.name)],
                religion: [x.religion.map((y: IReligion) => y.name)],
                currency: x.currency.name,
                area: x.area,
                population: x.population,
                GDP: x.GDP,
                web_domain: x.web_domain,
                call_code: x.calling_code,
                driving_on_right: (x.driving_on_right ? 'Right' : 'Left'),
                flag: x.flag_url,
                delete: x.id,
              }
            )
          })
      
      const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 30 },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'full_name', headerName: 'Full Name', width: 150 },
        { field: 'capital_city', headerName: 'Capital', width: 100 },
        { field: 'continent', headerName: 'Continent', width: 100 },
        { field: 'language', headerName: 'Language', width: 100 },
        { field: 'religion', headerName: 'Religion', width: 100 },
        { field: 'currency', headerName: 'Currency', width: 100 },
        { field: 'area', headerName: 'Area(km2)', width: 100 },
        { field: 'population', headerName: 'Population', width: 100 },
        { field: 'GDP', headerName: 'GDP(mln$)', width: 100 },
        { field: 'web_domain', headerName: 'Domain', width: 60 },
        { field: 'call_code', headerName: 'Call Code', width: 100 },
        { field: 'driving_on_right', headerName: 'Driving Side', width: 100 },
        { field: 'flag', headerName: 'Flag', width: 80, renderCell: (params) => <img src={params.value} /> },
        { field: 'delete', headerName: 'Delete', width: 100, renderCell: (params) => 
        <Button size="small" onClick={(e: any) => {deleteCountry(params.value)}} variant="contained"><DeleteIcon /></Button> },
      ];

    return (
          <div style={{ height: 500, width: '99%' }}>
          <DataGrid 
            rows={rows} 
            columns={columns}
            rowsPerPageOptions={[0]}
          />
          </div>

    )
}

export default ListCountries;