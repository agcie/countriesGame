import React from 'react';
import styled from 'styled-components';
import ICountry from '../add/api-ifc/ICountry';


const Level = styled.div`
    margin: 20px;
    padding: 20px;
    border: 1px solid black;
    width: 30%;
    text-align: center;
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
      <div className="Play">


        {props.level >= 1 &&
            <Level>
               <b>Powierzchnia:</b> {(props.country.area).toLocaleString()}km2 <br/>
               <b>PKB:</b> {props.country.GDP} mld$<br/>
               <b>Symbol waluty:</b> {props.country.currency.symbol}<br/>
               <b>Domena internetowa:</b> {props.country.web_domain}<br/>
            </Level>
        }
        {props.level >= 2 &&
            <Level>
               <b>Numer Kierunkowy:</b> {props.country.calling_code}<br/>
               {props.country.driving_on_right && <p>Ruch prawostronny</p>}
               {!props.country.driving_on_right && <p>Ruch lewostronny</p>}
               <b>Populacja:</b> {(props.country.population).toLocaleString()}<br/>
               <b>Populacja stolicy:</b> {(props.country.capital_city.population).toLocaleString()}<br/>

            </Level>
        }
        {props.level >= 3 &&
            <Level>
                <b>Kontynent: </b> {props.country.continent.name}<br/>
                <b>Religie panujące w państwie:</b> {
                    props.country.religion.map(e =>
                        <p>{e.name}</p>)
                }<br/>
                <b>Współrzędne stolicy:</b> {props.country.capital_city.latitude} {props.country.capital_city.longitude}<br/>
            </Level>
        }

        {props.level >= 4 &&
            <Level>
               <b>Nazwa Waluty:</b> {props.country.currency.name} <br/>
               <b>Języki urzędowe:</b> {
                    props.country.language.map(e =>
                        <p>{e.name}</p>)
                }<br/>
            </Level>
        }
        {props.level >= 5 &&
            <Level>
            <b>Stolica:</b> {props.country.capital_city.name}<br/>
            <b>Flaga:</b><br/>
            <img src={props.country.flag_url} width={100} height={60}/>
            </Level>
        }
        {props.level >= 5 &&
        <Level>
            Nie ma już więcej informacji o tym państwie
        </Level>
        }
    
    </div>

    )
  }

export default Play;