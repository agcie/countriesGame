import React from 'react';
import styled from 'styled-components';
import ICountry from '../add/api-ifc/ICountry';

import {BiWorld} from 'react-icons/bi';
import {MdMonetizationOn}from 'react-icons/md';
import {IoIosPeople}from 'react-icons/io';
import {CgMaximize}from 'react-icons/cg';
import {AiFillCar}from 'react-icons/ai';
import {GrCurrency}from 'react-icons/gr';
import {BsFillTelephoneFill}from 'react-icons/bs';
import {FaCross}from 'react-icons/fa';
import {BsGeoAltFill}from 'react-icons/bs';
import {TbLanguage}from 'react-icons/tb';
import {FaCity}from 'react-icons/fa';
import {MdComputer}from 'react-icons/md';

//import {}from 'react-icons/';

const Levels = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
`;

const Level = styled.div`
    margin: 20px;
    padding: 20px;
    font-family:"Cinzel";
    font-size: 1.5em;
    text-align: center;
`;
const Flag = styled.img`
padding: 3px;
background-color: black;
border-radius: 5px;

    width: 150px;
`;
const Name= styled.p`
    font-size: 1em;
`;
const Value= styled.p`
    font-size: 1em;
`;
interface PlayProps{
    country: ICountry;
    level: number;
}

const Play = ( props: PlayProps) => {
     return (
      <Levels>


        {props.level >= 1 &&
            <Level>
                <b> <BiWorld/> Kontynent: </b> {props.country.continent.name}<br/>
                <b><CgMaximize/>Powierzchnia:</b> {(props.country.area).toLocaleString()}km2 <br/>
                <b><MdMonetizationOn/> PKB:</b> {props.country.GDP} mld$<br/>
                <b> <IoIosPeople/> Populacja:</b> {(props.country.population).toLocaleString()}<br/>
            </Level>
        }
        {props.level >= 2 &&
            <Level>
                <b><BsFillTelephoneFill/>Numer Kierunkowy:</b> {props.country.calling_code}<br/> 
               {props.country.driving_on_right && <p> <AiFillCar/> Ruch prawostronny</p>}
               {!props.country.driving_on_right && <p> <AiFillCar/> Ruch lewostronny</p>}
               <b> <GrCurrency/> Symbol waluty:</b> {props.country.currency.symbol}<br/>
               <b><IoIosPeople/>Populacja stolicy:</b> {(props.country.capital_city.population).toLocaleString()}<br/>

            </Level>
        }
        {props.level >= 3 &&
            <Level>
                
                <b><FaCross/> Religie panujące w państwie:</b> {
                    props.country.religion.map(e =>
                        <p>{e.name}</p>)
                }<br/>
                <b><BsGeoAltFill/> Współrzędne stolicy:</b> {props.country.capital_city.latitude} {props.country.capital_city.longitude}<br/>
            </Level>
        }

        {props.level >= 4 &&
            <Level>
               <b><GrCurrency/> Kod Waluty:</b> {props.country.currency.code} <br/>
               <b><TbLanguage/> Języki urzędowe:</b> {
                    props.country.language.map(e =>
                        <p>{e.name}</p>)
                }<br/>
                <b><FaCity/>Stolica:</b> {props.country.capital_city.name}<br/>
                
            </Level>
        }
        {props.level >= 5 &&
            <Level>
            <b><MdComputer/>Domena internetowa:</b> {props.country.web_domain}<br/>
            <b>Flaga:</b><br/>
            <Flag  src={props.country.flag_url} />
            </Level>
        }
        {props.level >= 5 &&
        <Level>
            Nie ma już więcej informacji o tym państwie
        </Level>
        }
    
    </Levels>

    )
  }

export default Play;