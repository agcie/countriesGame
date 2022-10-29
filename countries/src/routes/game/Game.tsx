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

const All = styled.div`
width: 100%`;
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
  font-size: 2em;
  border-radius: 10px;
  box-shadow: 10px 10px;
  text-align:center;
  font-family:"Cinzel";
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
margin-bottom: 0px;
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
const GameCont = styled.div`
display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: auto auto;
`;
const GameConfigBlock = styled.div`
background-color: white;
border: 1px solid rgba(0, 0, 0, 0.8);
margin: 20px;
border-radius: 20px;
`;
const GameConfigBlockPlayers = styled(GameConfigBlock)`
border: 0px solid white;
`;
const CenterButton= styled.div`
text-align: center;
`;
const Adding = styled.div`
margin-top:0px;
text-align: center;
`;
const Hard = styled.div`
text-align: center;
font-family:"Cinzel";
margin: 10px;
font-size: 1.2em;
`;
const baseurl ="http://127.0.0.1:8000/";

interface Player{
  pname: string;
  points: number;
  isActive: boolean;
}

interface GameProps{
  playersNum: number;
  playerList: Array<Player>;
  rounds: number;
  diff: number;
}


const Game = (props: GameProps) => {

  const [fullList, setFullList] = useState<ICountriesList[]>([]);
  const [list, setList] = useState<ICountriesList[]>([]);
  const [country, setCountry] = useState<ICountry>();

  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);
  const [isWinner, setIsWinner] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState(0);
  const [guesses, setGuesses] = useState<string[]>([]);

  const [points, setPoints]= useState(20);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [players, setPlayers] = useState(1);
  const [playerList, setPlayerList] = useState<Player[]>([{pname: "Player 1", points: 0, isActive: true}]);

  
  const [currentTurn, setCurrentTurn] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [rounds, setRounds] = useState(3);
  const [end, setEnd] = useState(false);

  const [diff, setDiff] = useState<number>(Number(0));

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
      console.log(playerList)
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
        if(playerList[i].points > max)
        {
          index = i;
          max = playerList[i].points;
        } else if(playerList[i].points === max)
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
      setCurrentPlayer(currentPlayer+1);

      for(let i = 0; i<players; i++)
      {
        if(i-1===currentPlayer)
        {
          playerList[i].isActive = true;
        }
        else if(currentPlayer+1-players===i)
        {
          playerList[i].isActive = true;
        }
        else
        {
          playerList[i].isActive = false;
        } 
      }
      if(currentPlayer===players-1)
      {
        setCurrentPlayer(0);
      }
      setPlayerList(playerList);
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
              playerList[currentPlayer].points+=0;
              setPlayerList(playerList);
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
            playerList[currentPlayer].points+=(points*country.difficulty);
            setGuesses([]);
            setCurrentTurn(currentTurn+1);
            checkWin();
            changePlayer();
        }
        
    }

    return (
      <All>
        <BiggestTitle><FiMap/> Gra w państwa</BiggestTitle>
        {country == null &&
        <div>
        
         <CenterButton> <Button onClick={getRandomCountry}>Start</Button></CenterButton>
        </div>
        }

        {isWinner === true && 
        <div>
          <ul>
          <PlayersView players={playerList} ended={true} currentPoints={0}/> 
          </ul>
            {isDraw === false &&
              <div>
                <BigTitle>Zwycięzca: {playerList[winner].pname}</BigTitle>
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


    

        {end===true &&
          <div>
            <BigTitle>Zgadłeś!</BigTitle>
            <CenterButton> <Button onClick={getRandomCountry}>Następny Gracz </Button></CenterButton>
          </div>
        }
        
        {end===false &&
        <div>
          
          <GameConfigBlockPlayers>
            <CenterButton> <DInput type="text"  list="list" placeholder={"Wybierz państwo"}  value={name} onChange={(e: any) =>{ setName(e.target.value)}}/>
            <DList id="list">
            {fullList.filter(({name}) => !(guesses.includes(name))).map(({id, name}) => 
                {return (<DOption value={name}/>)})}
            </DList>
            
          <Button onClick={submitCountry}>Zgaduje</Button></CenterButton>
          </GameConfigBlockPlayers>
          <GameCont>
          <GameConfigBlockPlayers>
          <BigTitle>Runda {currentRound}</BigTitle>
          <PlayersView players={playerList} ended={false} currentPoints={points*country.difficulty }/>   
          </GameConfigBlockPlayers>
          <GameConfigBlock>
          <Play country={country} level={level}/>
         </GameConfigBlock>

      </GameCont>
      <SmallTitle>Twoje próby:</SmallTitle>
        {guesses.map(e => { return (<div> {e} </div>)})}
        <br/>
      </div>
       
        }
         
      </div>}
      </All>
    );
  }

export default Game;