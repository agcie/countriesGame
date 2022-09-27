import axios, { AxiosResponse } from 'axios';
import { dirxml } from 'console';
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
            // data.map((x: any) => 
            // {
            //   return (
                // <p id={x.id.toString()}>
                //   {x.name}  {x.full_name} {x.currency.name}
                //   {x.language.map((y: any) => {
                //     return (<p> {y.name} </p>);
                //   })}
                //   <button onClick={(e: any) => {deleteCountry(x.id)}}>Delete</button>
                // </p>

                <table>
                  <tr>
                    <th>Name</th>
                    <th>Full Name</th>
                    <th>Capital</th>
                    <th>Continent</th>
                    <th>Language</th>
                    <th>Religion</th>
                    <th>Currency</th>
                    <th>Action</th>
                    <th>Area</th>
                    <th>Population</th>
                    <th>GDP</th>
                    <th>Domain</th>
                    <th>Call code</th>
                    <th>Driving Right</th>
                    <th>Action</th>
                  </tr>
                  {

                        data.map((x: any) => 
                        {
                          return (
                            <tr>
                              <td>{x.name}</td>
                              <td>{x.full_name} </td>
                              <td>{x.capital_city.name} </td>
                              <td>{x.continent.name} </td>
                              {x.language.map((y: any) => {
                              return (<p> {y.name} </p>);
                              })}
                              <td>{x.full_name} </td>
                              <td>{x.full_name} </td>
                              <td><button onClick={(e: any) => {deleteCountry(x.id)}}>Delete</button></td>
                              </tr>
                            )
                        })
                        
                      }
                  </table>
                
            }
            
          
        </div>
    )
}

export default ListCountries;