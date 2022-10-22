import axios, { AxiosResponse } from 'axios';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ICountriesList from '../add/api-ifc/ICountriesList';
import ICountry from '../add/api-ifc/ICountry';
import ILanguage from '../add/api-ifc/ILanguage';
import Play from './Play';
import Player from './Player';
import {FiMap} from 'react-icons/fi';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPerson} from "react-icons/bs";
import {CiEdit} from "react-icons/ci";
import {MdDoneOutline} from "react-icons/md";
import PlayersView from './PlayersView';

const Button = styled.button`
  border: none;
  font-size: 2em;
  font-family: "Amatic SC";
  margin: 30px;
  padding: 10px;
  border-radius: 20px;
  font-style: bold;
  color: white;
  box-shadow: 5px 5px 5px;
  background-image: linear-gradient(lightgreen, green);
  text-decoration: none;
  &:hover {
    color: black;
  }
`;
const SmallButton= styled(Button)`
font-size: 1em;
margin: 3px;
padding: 6px;
`;

const PlayerDiv = styled.div`
text-align: center;
font-family:"Cinzel";

margin: 10px;
font-size: 1.2em;
`;

const Plus = styled(Button)`
font-family: "Arial";
padding-left: 20px;
padding-right: 20px;
border-radius: 30px;
`

const DList = styled.datalist`
  font-size: 4em;
color: red;
`;
const DInput = styled.input`
  margin: 20px;
  font-size: 4em;
  border-radius: 10px;
  border: 5px dotted black;
  box-shadow: 10px 10px;
`;
const DOption = styled.option`
font-size: 4em;
color: red;
`;
const BigTitle = styled.h1`
text-align: center;
font-family: "Amatic SC";
font-style: bold;
font-size: 3em;
color: green;
text-shadow: 3px 3px 5px white;
`;
const BiggestTitle = styled(BigTitle)`
font-size: 4em;
`;
const SmallTitle = styled.h3`
text-align: center;
font-family: "Amatic SC";
font-style: bold;
font-size: 1.7em;
text-shadow: 1px 1px 3px grey;
color: green;
`;
const NumberOf = styled(SmallTitle)`
text-align: left;
display: inline;
`;
const GameConfigCont = styled.div`
display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
`;

const GameConfigBlock = styled.div`
background-color: white;
border: 1px solid rgba(0, 0, 0, 0.8);
margin: 20px;
border-radius: 20px;
`;

const CenterButton= styled.div`
text-align: center;
`;
const Adding = styled.div`
text-align: center;
`;
const Hard = styled.div`
text-align: center;
font-family:"Cinzel";

margin: 10px;
font-size: 1.2em;
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

  const [playerNames, setPlayerNames] = useState<string[]>(["Player 1", "Player 2"]);
  const [points, setPoints]= useState(20);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [players, setPlayers] = useState(2);
  const [playerList, setPlayerList] = useState<PlayerList[]>([{pname: "Player 1", points: 0, isActive: true}, {pname: "Player 2", points: 0, isActive: false}]);
  const [playerPoints, setPlayerPoints] = useState([0, 0]);

  
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState(3);
  const [end, setEnd] = useState(false);

  const [diff, setDiff] = useState<number>(Number(0));
  const [edit, setEdit] = useState([false,false]);
  const [nameToChange, setNameToChange] = useState(["", ""]);

    useEffect(() => {
      axios.get<ICountriesList[]>(`${baseurl}countries/list/id`)
      .then((response : AxiosResponse)  =>
      {
          setFullList(response.data);
          setList(response.data);
      } ) }, []);

    const changeDifficulty = (e: any) => {
      setDiff(e.currentTarget.value)

      const str = e.currentTarget.value == 0 ? "" : `?difficulty=${e.currentTarget.value}`;
      axios.get<ICountriesList[]>(`${baseurl}countries/list/id${str}`)
      .then((response : AxiosResponse)  =>
      {
          setList(response.data);
      } )
    }

    const getRandomCountry = async () =>
    {
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
            if(points<=2)
            {
              setEnd(true);
              setList(list.filter(x => !(x.id == country!.id)))
              setName("");
              playerPoints[currentPlayer]+=0;
              setPlayerPoints(playerPoints);
              setGuesses([]);
              setCurrentTurn(currentTurn+1);
              checkWin();
              changePlayer();
              
            } else 
            {
              setPoints(points - 3);
            }
            
        }
        else{
            setEnd(true);
            setList(list.filter(x => !(x.id == country!.id)))

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
        setEdit([...edit, false]);
        setNameToChange([...nameToChange, ""]);
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
        setEdit([...edit].splice(0, players-1));
        setNameToChange([...nameToChange].splice(0, players-1));
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

    const editPlayer = (idx: number) =>
    {
      setEdit(edit.map((x, id) => {
        if(id==idx)
      {
        return !x;
      }
      return x;}
      ))
    }

    const setNewName = (idx: number) =>
    {
      const newName = nameToChange[idx];
      setPlayerNames(playerNames.map((x, id) =>
      {
        if(id==idx)
            {
              return newName;
            }
            else
            {
              return x;
            }
      }));
      setPlayerList(playerList.map((x, id) =>
      { 
        if(id==idx)
            {
              return {pname: newName, points: x.points, isActive: x.isActive};
            }
            else
            {
              return x;
            }
      }));
      setNameToChange(nameToChange.map((x, id) => 
        {
            if(id==idx)
            {
              return "";
            }
            else
            {
              return x;
            }
        }
      ));
      setEdit(edit.map((x, id) => {
        if(id==idx)
      {
        return !x;
      }
      return x;}
      ))
      
    }

    const updateNamesToChange = (e: any, idx: number) =>
    {
      setNameToChange(nameToChange.map((x, id) => 
        {
            if(id==idx)
            {
              return e.target.value;
            }
            else
            {
              return x;
            }

        }
      ));
    }
    
    

    return (
      <div className="Game">
        <BiggestTitle><FiMap/> Gra w państwa</BiggestTitle>
        {country == null &&
        <div>
        <GameConfigCont>
        <GameConfigBlock>
          <SmallTitle><span className="material-symbols-outlined">group</span> Liczba graczy</SmallTitle>
          <Adding>
          <Plus onClick={addPlayer}>+</Plus> 
          <NumberOf>{players}</NumberOf>
          <Plus onClick={subPlayer}>-</Plus>
          </Adding>

          </GameConfigBlock>
          <GameConfigBlock>
          <SmallTitle><AiOutlineCheckCircle/> Liczba rund</SmallTitle>
          <Adding>
          <Plus onClick={addRound}>+</Plus> 
          <NumberOf>{rounds}</NumberOf>
          <Plus onClick={subRound}>-</Plus> 
          </Adding>
        </GameConfigBlock>

        <GameConfigBlock> 
          {
          playerNames.map((x, idx) => {return <div>
            {edit[idx] === false &&          
              <PlayerDiv><BsPerson/> {x} {edit[idx]}<SmallButton onClick={() => editPlayer(idx)}><CiEdit/></SmallButton ></PlayerDiv>
            }
            {edit[idx] === true &&  
              <PlayerDiv><input type="text"  onChange={(e) => updateNamesToChange(e, idx) }/> <SmallButton onClick={() => setNewName(idx)}><MdDoneOutline/></SmallButton ></PlayerDiv>
            }
            </div>
          })
          }
          {edit.map(x => {
              return <div>
                {x}
              </div>
          })}
        
        </GameConfigBlock>

        <GameConfigBlock>         
        <SmallTitle>Poziom Trudności</SmallTitle> 
        <Hard>
              <input type="radio"
                value="0"
                checked={diff==0}
                onChange={changeDifficulty} />Wszystko
        </Hard>
        <Hard>
              <input type="radio"
               value="1"
               checked={diff==1}
               onChange={changeDifficulty} />Łatwy
        </Hard>
        <Hard>
              <input type="radio"
               value="2"
               checked={diff==2}
               onChange={changeDifficulty} />Średni
      </Hard>
       <Hard>
              <input type="radio"
               value="3"
               checked={diff==3}
               onChange={changeDifficulty} />Trudny
        </Hard>
        </GameConfigBlock>
        </GameConfigCont>
         <CenterButton> <Button onClick={getRandomCountry}>Start</Button></CenterButton>
        </div>
        }

        {isWinner === true && 
        <div>
          <ul>
          <PlayersView players={playerList} ended={true}/> 
          </ul>
            {isDraw === false &&
              <div>
                <BigTitle>Zwycięzca: {playerNames[winner]}</BigTitle>
              </div>
            }
            {isDraw === true &&
              <div>
                <BigTitle>Remis!</BigTitle>
              </div>
            }
          </div>
          }

       {country != null && isWinner === false &&
        <div>
        <BigTitle>Runda {currentRound}</BigTitle>

    

        {end===true &&
          <div>
            <BigTitle>Zgadłeś!</BigTitle>
            <Button onClick={getRandomCountry}>Następny Gracz </Button>
          </div>
        }

        {end===false &&
        <div>
            <DInput type="text"  list="list" placeholder={"Wybierz państwo"}  value={name} onChange={(e: any) =>{ setName(e.target.value)}}/>
            <DList id="list">
            {fullList.filter(({name}) => !(guesses.includes(name))).map(({id, name}) => 
                {return (<DOption value={name}/>)})}
            </DList>
          <button onClick={submitCountry}>Zgaduje</button>
          <GameConfigCont>
          <GameConfigBlock>


<SmallTitle>Możesz zdobyć w tej rundzie:  {points*country.difficulty} punktów</SmallTitle>
<SmallTitle>Twoje próby:</SmallTitle>
{guesses.map(e => { return (<div> {e} </div>)})}
<br/>
<PlayersView players={playerList} ended={false}/>   
</GameConfigBlock>
          <GameConfigBlock>
            <Play country={country} level={level}/>
          </GameConfigBlock>

      </GameConfigCont>
      </div>
       
        }
         
      </div>}
      </div>
    );
  }

export default Game;