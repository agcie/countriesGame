import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { NumericLiteral } from 'typescript';
import ICountriesList from '../add/api-ifc/ICountriesList';
import ICountry from '../add/api-ifc/ICountry';
import ILanguage from '../add/api-ifc/ILanguage';


const baseurl ="http://127.0.0.1:8000/";


interface PlayProps{
    countiresList: ICountriesList[];
    country: ICountry;
}

const Play = ( playPros: PlayProps) => {

    const [level, setLevel] = useState(1);
    const [ans, setAns] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [points, setPoints]= useState(20);

    const getCountryFromId = (id: number) =>
    {
        const idx = playPros.countiresList.findIndex(e => e.id == id);
        return playPros.countiresList[idx].name;
    }
    const choosenAns=(e: number) =>{

        console.log(e);
        if(e != playPros.country.id)
        {
            setLevel(level + 1);
            setPoints(points - 3);
            setGuesses([...guesses, getCountryFromId(e)]);
        }
    }
    return (
      <div className="Play">
        <h1>Rozgrywka</h1>
        {playPros.country.name} <br/>

        Choose ans: 
        <select value={ans} onChange={(e: any) =>{ choosenAns(e.target.value)}}>
          {playPros.countiresList.map(({id, name}) => 
            {
              return (<option value={id}>{name} </option>)
            })}
        </select>

        
        {level >= 1 &&
            <div>
            <h1>Level 1</h1>
            
               area: {playPros.country.area} <br/>
               GDP: {playPros.country.GDP}<br/>
               currency symbol: {playPros.country.currency.symbol}
            </div>
        }
        {level >= 2 &&
            <div>
            <h1>Level 2</h1>
            
            calling_code: {playPros.country.calling_code}<br/>
               currency name: {playPros.country.currency.name}
            </div>
        }
        {level >= 3 &&
            <div>
            <h1>Level 3</h1>
               area: {playPros.country.area}<br/>
               GDP: {playPros.country.GDP}
            </div>
        }

        {level >= 4 &&
            <div>
            <h1>Level 4</h1>
                area: {playPros.country.area}<br/>
                GDP: {playPros.country.GDP}
            </div>
        }
        <h1>Your Guessed :</h1>
        {guesses.map(e => {
            return (<div> {e} </div>)
        })}
 <h1>Your points : {points*playPros.country.difficulty}</h1>
      </div>
    );
  }

export default Play;