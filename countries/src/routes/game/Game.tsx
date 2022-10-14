import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICountriesList from '../add/api-ifc/ICountriesList';
import ICountry from '../add/api-ifc/ICountry';
import ILanguage from '../add/api-ifc/ILanguage';
import Play from './Play';


const baseurl ="http://127.0.0.1:8000/";


const Game = () => {

  const [fullList, setFullList] = useState<ICountriesList[]>([]);
  const [list, setList] = useState<ICountriesList[]>([]);
  const [country, setCountry] = useState<ICountry>();
  const [randomId, setRandomId] = useState<number>();
  const [diff, setDiff] = useState<number>(Number(1));


  useEffect(() => {
    axios.get<ICountriesList[]>(`${baseurl}countries/list/id`)
    .then((response : AxiosResponse)  =>
    {
        setFullList(response.data);
        setList(response.data);
    } ) }, []);

    const handleChange = (e: any) => {
      setDiff(e.currentTarget.value)
      axios.get<ICountriesList[]>(`${baseurl}countries/list/id${e.currentTarget.value}`)
      .then((response : AxiosResponse)  =>
      {
          setList(response.data);
      } )
    }

    const getRandomCountry = async () =>
    {
      axios.get<ICountry>(`${baseurl}countries/full/${list[Math.floor(Math.random() * list.length)].id}`)
      .then(async (response : AxiosResponse)  =>
      {
          setCountry(response.data);
      } )
    }

    return (
      <div className="Game">
        <h1>Countries Game</h1>
        {/* 
          Button start new game:
          router -> play {id, country, list, player}
          <Play id={1} country={} countiresList={list}/>
        */}
        <select defaultValue={0} onChange={handleChange}>
          <option value={""}>Wszystko</option>
          <option value={"?difficulty=1"}>Łatwy</option>
          <option value={"?difficulty=2"}>Średni</option>
          <option value={"?difficulty=3"}>Trudny</option>
        </select>
       

        <button onClick={getRandomCountry}>
          Start Game
        </button>

       {country != null &&
        <Play countriesList={fullList} country={country}/>
       }
      </div>
    );
  }

export default Game;