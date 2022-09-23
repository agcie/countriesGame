
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import IContinent from '../../api-ifc/IContinent';

const ContinentMain = () => {
  const [continent, setContinent] = useState("");
  const [continents, setContinents] = useState< IContinent[] >([]);

  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    console.log(continent)
    setContinents([...continents, {name: continent, id: 0}])
    console.log(continents);
  }
  const handleChange= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setContinent(e.currentTarget.value)
  }

  const [data, setData] = useState< IContinent[] >([]);
  useEffect(() => {
    axios.get<IContinent>(`http://127.0.0.1:8000/continents`)
    .then((response : AxiosResponse)  =>
    {
        setData(response.data);
        console.log(response);
    } )
    .catch(console.error);
  }, []);

  return (
    <div className="Continent">
      Continents
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>

          {
          data.map(({id, name}: IContinent) => {
            return (<p>
              {name}

              </p>)
          })
          }

    </div>
  );
}

export default ContinentMain;