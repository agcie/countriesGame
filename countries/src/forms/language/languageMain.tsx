
import axios from 'axios';
import React, { useState } from 'react';

const baseurl ="http://127.0.0.1:8000/";


const LanguageMain = () => {

  const [language, setLanguage] = useState("");

  const handleAdd = (e:  React.FormEvent) =>{
    e.preventDefault();
    axios.post(`${baseurl}languages/`,
      {
        name: language
      }
    )
  }

  const handleChange= (e:  React.ChangeEvent<HTMLInputElement>) =>{
    setLanguage(e.currentTarget.value)
  }
  return (
    <div className="Language">
      <h1>Language</h1>
      <form onSubmit={handleAdd}>
        <label> Name: <input type="text" onChange={handleChange}></input> </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LanguageMain;