import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ICountriesList from '../add/api-ifc/ICountriesList';
import ICountry from '../add/api-ifc/ICountry';
import ILanguage from '../add/api-ifc/ILanguage';
import Play from './Play';

const Button = styled.button`
  border: none;
  font-size: 2em;
  margin: 50px;
  padding: 15px;
  border-radius: 20px;
  color: white;
  box-shadow: 5px 5px 5px;
  background-image: linear-gradient(pink, purple);
  text-decoration: none;
  &:hover {
    color: black;
  }
`

const DList = styled.datalist`
  font-size: 4em;
  & option{
    font-size: 4em;
  }
`;
const DInput = styled.input`
  margin: 20px;
  
  font-size: 1em;
`;
const baseurl ="http://127.0.0.1:8000/";


const Game = () => {

  const [fullList, setFullList] = useState<ICountriesList[]>([]);
  const [list, setList] = useState<ICountriesList[]>([]);
  const [country, setCountry] = useState<ICountry>();
  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);
  const [winner, setWinner] = useState(false)
  const [points, setPoints]= useState(20);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [players, setPlayers] = useState(3);
  const [playerPoints, setPlayerPoints] = useState([0,0,0,0,0,0]); //to trzeba inaczej
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
      setCurrentPlayer((currentPlayer%players)+1);
      setWinner(false);
      setLevel(1);
      setPoints(20);
      axios.get<ICountry>(`${baseurl}countries/full/${list[Math.floor(Math.random() * list.length)].id}`)
      .then(async (response : AxiosResponse)  =>
      {
          setCountry(response.data);

      } )
    }

    const getIdFromCountry = (name: string) =>
    {
        const idx = list.findIndex(e => e.name == name);
        return list[idx].id;
    }

    const submitCountry=() =>
    {
        const id = getIdFromCountry(name)
        if(id != country?.id)
        {
            setLevel(level + 1);
            setPoints(points - 3);
            setGuesses([...guesses, name]);
            setName("")
        }
        else{
            setWinner(true)
            setName("")
            let tab = playerPoints;
            playerPoints[currentPlayer-1]+=(points*country.difficulty);
            console.log(playerPoints)
            setPlayerPoints(playerPoints);
            setGuesses([]);
        }
    }

    return (
      <div className="Game">
        <h1>Countries Game</h1>
        {country == null &&
        <div>
          {players} 
          <Button onClick={()=>setPlayers(players+1)}>+</Button> 
          <Button onClick={()=>setPlayers(players-1)}>-</Button>

          <select defaultValue={0} onChange={handleChange}>
          <option value={""}>Wszystko</option>
          <option value={"?difficulty=1"}>Łatwy</option>
          <option value={"?difficulty=2"}>Średni</option>
          <option value={"?difficulty=3"}>Trudny</option>
        </select>
          <Button onClick={getRandomCountry}>Start Game </Button>
        </div>
        }

       {country != null &&
        <div>
        {winner===true &&
          <div>
            <h1>Wygrales!</h1>
            <Button onClick={getRandomCountry}>Next player </Button>
          </div>
        }

        {winner===false &&
        <div>
            <DInput type="text"  list="list" placeholder={"Wybierz państwo"}  value={name} onChange={(e: any) =>{ setName(e.target.value)}}/>
            <DList id="list">
            {list.filter(({name}) => !(guesses.includes(name))).map(({id, name}) => 
                {return (<option value={name}/>)})}
            </DList>

          <button onClick={submitCountry}>Zgaduje</button>

          <Play country={country} level={level}/>
          <h3>Możesz zdobyć w tej rundzie: </h3>
          {points*country.difficulty} punktów
          <h3>Twoj próby:</h3>
          {guesses.map(e => { return (<div> {e} </div>)})}
          <br/>
        </div>

       
        }

        Aktualnie zgaduje: player{currentPlayer} <br/>
        player1: {playerPoints[0]} <br/>
        player2: {playerPoints[1]} <br/>
        player3: {playerPoints[2]} <br/>
      </div>
      
      }</div>
    );
  }

export default Game;