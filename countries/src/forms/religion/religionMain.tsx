
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import IReligion from '../../api-ifc/IReligion';

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
  return (
    <div className="Religion">
      <h1>Religion</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChangeName}></input> </label>
        <label> Description: <textarea  onChange={handleChangeDesc}></textarea> </label>

        <input type="submit" value="Submit" />
      </form>
      <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
      {

            data.map(({id, name, description}: IReligion) => 
            {
              return (
                <tr>
                  <td>{name}</td>
                  <td>{description} </td>
                  <td><button onClick={(e: any) => {deleteReligion(id)}}>Delete</button></td>
                  </tr>
                )
            })
            
          }
        </table>
    </div>
  );
}

export default ReligionMain;