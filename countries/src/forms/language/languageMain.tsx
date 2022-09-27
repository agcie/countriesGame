
import axios, {AxiosResponse} from 'axios';
import React, { useState, useEffect } from 'react';
import ILanguage from '../../api-ifc/ILanguage';

const baseurl ="http://127.0.0.1:8000/";


const LanguageMain = () => {

  // const [language, setLanguage] = useState("");

  const [name, setName] = useState("");
  const [data, setData] = useState< ILanguage[] >([]);

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
        name: name
      }
    )
  }

  const handleChange= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.currentTarget.value)
  }
  return (
    <div className="Language">
      <h1>Language</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>

      <table>
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
      {

            data.map(({id, name}: ILanguage) => 
            {
              return (
                <tr>
                  <td>{name}</td>
                  <td><button onClick={(e: any) => {deleteLanguage(id)}}>Delete</button></td>
                  </tr>
                )
            })
            
          }
        </table>

    </div>
  );
}

export default LanguageMain;