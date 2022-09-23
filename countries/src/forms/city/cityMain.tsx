
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICity from '../../api-ifc/ICity';

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
      {
            data.map(({id, name, latitude, longitude, population}: ICity) => 
            {
              return (
                <p id={id.toString()}>
                  <b>{name}</b> : [{latitude}, {longitude}], popolation: {population} <button onClick={(e: any) => {deleteCity(id)}}>Delete</button> 
                </p>)
            })
          }
    </div>
  );
}

export default CityMain;