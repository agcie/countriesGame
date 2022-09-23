
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import IContinent from '../../api-ifc/IContinent';

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
  return (
    <div className="Continent">
      <h1>Continents</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>

          {
            data.map(({id, name}: IContinent) => 
            {
              return (
                <p id={id.toString()}>
                  {name} <button onClick={(e: any) => {deleteContinent(id)}}>Delete</button>
                </p>)
            })
            
          }
          <select value={selected} onChange={(e: any) =>{ setSelected(e.target.value)}}>
          {
            data.map(({id, name}: IContinent) => 
            {
              return (
                <option value={id}>{name}</option>
                )
            })
            
          }
          </select>
          selected id: {selected}

    </div>
  );
}

export default ContinentMain;