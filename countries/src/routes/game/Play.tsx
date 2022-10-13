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
    const [name, setName] = useState("")
    const [winner, setWinner] = useState(false)

    const getIdFromCountry = (name: string) =>
    {
        const idx = playPros.countiresList.findIndex(e => e.name == name);
        return playPros.countiresList[idx].id;
    }
    const choosenAns=() =>{
        const id = getIdFromCountry(name)
        if(id != playPros.country.id)
        {
            setLevel(level + 1);
            setPoints(points - 3);
            setGuesses([...guesses, name]);
        }
        else{
            setWinner(true)
        }
    }
    return (
      <div className="Play">
        {winner===true &&
            <h1>Wygrales!</h1>
            
        }
        {winner===false &&
        <div>
        <h1>Rozgrywka</h1>
        {playPros.country.name} <br/>

        Choose ans: 
        {name}<br/>
        <input type="text"  list="list" onChange={(e: any) =>{ setName(e.target.value)}}/>
        <datalist id="list">
        {playPros.countiresList.map(({id, name}) => 
            {
              return (<option value={name}/>)
        })}
        </datalist>
        <button onClick={choosenAns}>Zgaduje</button>


        
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
    }
    </div>
    )
  }

export default Play;