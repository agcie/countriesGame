import axios, { AxiosResponse } from 'axios';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ICountriesList from '../add/api-ifc/ICountriesList';
import ICountry from '../add/api-ifc/ICountry';
import ILanguage from '../add/api-ifc/ILanguage';
import Play from './Play';
import Player from './Player';

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

interface PlayerList{
  pname: string;
  points: number;
  isActive: boolean;
}


const Game = () => {

  const [fullList, setFullList] = useState<ICountriesList[]>([]);
  const [list, setList] = useState<ICountriesList[]>([]);
  const [country, setCountry] = useState<ICountry>();

  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);

  const [playerNames, setPlayerNames] = useState<string[]>(["Player 1"]);
  const [points, setPoints]= useState(20);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [players, setPlayers] = useState(1);
  const [playerList, setPlayerList] = useState<PlayerList[]>([{pname: "Player 1", points: 0, isActive: true}]);
  const [playerPoints, setPlayerPoints] = useState([0]);
  
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState(3);
  const [end, setEnd] = useState(false);

  const [diff, setDiff] = useState<number>(Number(1));


  useEffect(() => {
    axios.get<ICountriesList[]>(`${baseurl}countries/list/id`)
    .then((response : AxiosResponse)  =>
    {
        setFullList(response.data);
        setList(response.data);
    } ) }, []);

    const changeDifficulty = (e: any) => {
      setDiff(e.currentTarget.value)
      axios.get<ICountriesList[]>(`${baseurl}countries/list/id${e.currentTarget.value}`)
      .then((response : AxiosResponse)  =>
      {
          setList(response.data);
      } )
    }

    const getRandomCountry = async () =>
    {
      console.log(playerList);
      if(currentPlayer===players)
      {
        setCurrentPlayer(0);
        
      }
      setEnd(false);
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
          const idx = fullList.findIndex(e => e.name == name);
          return fullList[idx].id;
    }

    const getWinner = () =>
    {
      let max = 0;
      let draw = false;
      let index = 0;
      for(let i = 0; i < players; i++)
      {
        if(playerPoints[i] > max)
        {
          index = i;
          max = playerPoints[i];
        } else if(playerPoints[i] === max)
        {
          draw = true;
        }
      }
      setIsDraw(draw);
      setWinner(index);

    }

    const checkWin = () =>
    {
      if(currentTurn===players-1 && currentRound<rounds)
        {
          setCurrentTurn(0);
          setCurrentRound(currentRound+1);
        } else if(currentRound===rounds && currentTurn===players-1)
        {
          setIsWinner(true);
          setEnd(true);
          getWinner();
        }
    }

    const changePlayer = () =>
    {
      let temp = [];
        setCurrentPlayer(currentPlayer+1);

      for(let i = 0; i<players; i++)
      {
        if(i-1===currentPlayer)
        {     
          temp.push({pname: playerNames[i], points: playerPoints[i], isActive: true});
        }
        else if(currentPlayer+1-players===i)
        {
          temp.push({pname: playerNames[i], points: playerPoints[i], isActive: true});
        }
        else
        {
          temp.push({pname: playerNames[i], points: playerPoints[i], isActive: false});
        } 
      }
      if(currentPlayer===players-1)
      {
        setCurrentPlayer(0);
      }
      setPlayerList(temp);
      setEnd(true);
    }

    const submitCountry=() =>
    {
        const id = getIdFromCountry(name)
        if(id != country?.id)
        {
            setLevel(level + 1);
            setGuesses([...guesses, name]);
            setName("")
            
            if(points<=3)
            {
              setPoints(0);
              setCurrentTurn(currentTurn+1);
              setEnd(true);
              changePlayer();
              checkWin();
              
            } else 
            {
              setPoints(points - 3);
            }
            
        }
        else{
            setEnd(true);
            setList(list.filter(x => !(x.id == country!.id)))
            console.log(list);
            setName("");
            let tab = playerPoints;
            playerPoints[currentPlayer]+=(points*country.difficulty);
            setPlayerPoints(playerPoints);
            setGuesses([]);
            setCurrentTurn(currentTurn+1);
            checkWin();
            changePlayer();
        }
        
    }

    const addPlayer = () =>
    {  
      if(players<10)
      {
        setPlayers(players+1);
        setPlayerPoints([...playerPoints, 0]);
        setPlayerList([...playerList, {pname: `Player ${players+1}`, points: 0, isActive: false}]);
        setPlayerNames([...playerNames, `Player ${players+1}`]);
      }
    }
    const subPlayer = () =>
    {
      if(players > 2)
      {
        setPlayers(players-1);
        setPlayerPoints([...playerPoints].splice(0, players-1));
        setPlayerList([...playerList].splice(0, players-1));
        setPlayerNames([...playerNames].splice(0, players-1));
      }
    }

    const addRound = () =>
    {  
      if(rounds<10)
      {
        setRounds(rounds+1);
        setPlayerPoints([...playerPoints, 0]);
      }
    }
    const subRound = () =>
    {
      if(rounds > 1)
      {
        setRounds(rounds-1);
        setPlayerPoints([...playerPoints].splice(0, players))
      }
    }

    
    

    return (
      <div className="Game">
        <h1>Countries Game</h1>
        {country == null &&
        <div>
          <h2>Liczba graczy</h2>
          {players} 
          <Button onClick={addPlayer}>+</Button> 
          <Button onClick={subPlayer}>-</Button>
          
          <h2>Liczba rund</h2>
          {rounds} 
          <Button onClick={addRound}>+</Button> 
          <Button onClick={subRound}>-</Button>

          <select defaultValue={0} onChange={changeDifficulty}>
          <option value={""}>Wszystko</option>
          <option value={"?difficulty=1"}>Łatwy</option>
          <option value={"?difficulty=2"}>Średni</option>
          <option value={"?difficulty=3"}>Trudny</option>
        </select>
          <Button onClick={getRandomCountry}>Start</Button>
        </div>
        }

        {isWinner === true && isDraw === false &&
          <div>
            <h1>Zwycięzca: player{winner}</h1>
            
          </div>

        }
        {isWinner === true && isDraw === true &&
          <div>
            <h1>Remis!</h1>
          
          </div>
        }

       {country != null && isWinner === false &&
        <div>
        <h1>Runda {currentRound}</h1>
        {end===true &&
          <div>
            <h1>Zgadłeś!</h1>
            <Button onClick={getRandomCountry}>Następny Gracz </Button>
          </div>
        }

        {end===false &&
        <div>
            <DInput type="text"  list="list" placeholder={"Wybierz państwo"}  value={name} onChange={(e: any) =>{ setName(e.target.value)}}/>
            <DList id="list">
            {fullList.filter(({name}) => !(guesses.includes(name))).map(({id, name}) => 
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

        Aktualnie zgaduje:<br/>
        {/* player1: {playerPoints[0]} <br/>
        player2: {playerPoints[1]} <br/>
        player3: {playerPoints[2]} <br/> */}
        <ul>
          {playerList.map(({pname, points, isActive}, index) => {return (<Player name={pname} points={points} isCurrent={isActive} id={index+1}/>)})}
        </ul>
      </div>
      
      }</div>
    );
  }

export default Game;