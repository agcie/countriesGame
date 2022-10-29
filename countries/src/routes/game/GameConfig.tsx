import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BsPerson} from "react-icons/bs";
import {CiEdit} from "react-icons/ci";
import {FiMap} from 'react-icons/fi';
import {MdDoneOutline} from "react-icons/md";
import Game from './Game';


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

interface Player{
    pname: string;
    points: number;
    isActive: boolean;
}

const GameConfig = () => {

const [players, setPlayers] = useState(1);
const [playerList, setPlayerList] = useState<Player[]>([{pname: "Player 1", points: 0, isActive: true}]);
const [rounds, setRounds] = useState(3);
const [diff, setDiff] = useState<number>(Number(0));
const [nameToChange, setNameToChange] = useState([""]);
const [edit, setEdit] = useState([false]);


const changeDifficulty = (e: any) => {
    setDiff(e.currentTarget.value)
}

const addPlayer = () =>
{  
  if(players<10)
  {
    setPlayers(players+1);
    setPlayerList([...playerList, {pname: `Player ${players+1}`, points: 0, isActive: false}]);
    setEdit([...edit, false]);
    setNameToChange([...nameToChange, ""]);
  }
}
const subPlayer = () =>
{
  if(players > 2)
  {
    setPlayers(players-1);
    setPlayerList([...playerList].splice(0, players-1));
    setEdit([...edit].splice(0, players-1));
    setNameToChange([...nameToChange].splice(0, players-1));
  }
}

const addRound = () =>
{  
  if(rounds<10)
  {
    setRounds(rounds+1);
  }
}
const subRound = () =>
{
  if(rounds > 1)
  {
    setRounds(rounds-1);
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
    <div>
    
    <BiggestTitle><FiMap/> Gra w państwa</BiggestTitle>
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
          playerList.map(({pname}, idx) => {return <div>
            {edit[idx] === false &&          
              <PlayerDiv><BsPerson/> {pname} {edit[idx]}<SmallButton onClick={() => editPlayer(idx)}><CiEdit/></SmallButton ></PlayerDiv>
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
      <CenterButton> 
        <Button>Start</Button>
        </CenterButton>
      </div>
      
)
}

export default GameConfig;