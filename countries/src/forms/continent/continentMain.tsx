
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import IContinent from '../../api-ifc/IContinent';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

var config = {
  headers: {'Access-Control-Allow-Origin': '*',
  
  "Access-Control-Allow-Credentials": "true", 
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
  "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
}
};

const ContinentMain = () => {
  const [continent, setContinent] = useState("");
  const [data, setData] = useState< IContinent[] >([]);
  const baseurl ="http://127.0.0.1:8000/";

  useEffect(() => {
    axios.get<IContinent>(`${baseurl}continents`, config)
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
    axios.post("http://127.0.0.1:8000/continents",
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
    console.log("deleting", "http://127.0.0.1:8000/continents/"+id.toString())
    axios.delete("http://127.0.0.1:8000/continents/"+id.toString())
  }

  return (
    <div className="Continent">
      Continents
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

    </div>
  );
}

export default ContinentMain;