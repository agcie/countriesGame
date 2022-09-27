import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';


const baseurl ="http://127.0.0.1:8000/";

//tbd: type of  country

const ListCountries = () => {

    const [data, setData] = useState< any[] >([]);

    useEffect(() => {
        axios.get<any>(`${baseurl}countries/list`)
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

    return (
        <div>
          {
            data.map((x: any) => 
            {
              return (
                <p id={x.id.toString()}>
                  {x.name}  {x.full_name} {x.currency.name}
                  {x.language.map((y: any) => {
                    return (<p> {y.name} </p>);
                  })}
                  <button onClick={(e: any) => {deleteCountry(x.id)}}>Delete</button>
                </p>)
            })
            
          }
        </div>
    )
}

export default ListCountries;