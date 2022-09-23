import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICity from '../../api-ifc/ICity';
import IContinent from '../../api-ifc/IContinent';
import ICurrency from '../../api-ifc/ICurrency';
import ILanguage from '../../api-ifc/ILanguage';
import IReligion from '../../api-ifc/IReligion';

const baseurl ="http://127.0.0.1:8000/";

const AddCountry = () => {
    const [selectedContinent, setSelectedContinent] = useState(1);
    const [continents, setContinents] = useState< IContinent[] >([]);
    const [selectedLanguage, setSelectedLanguage] = useState(1);
    const [languages, setLanguages] = useState< ILanguage[] >([]);
    const [selectedReligion, setSelectedReligion] = useState(1);
    const [religions, setReligions] = useState< IReligion[] >([]);
    const [selectedCity, setSelectedCity] = useState(1);
    const [cities, setCities] = useState< ICity[] >([]);
    const [selectedCurrency, setSelectedCurrency] = useState(1);
    const [currencies, setCurrencies] = useState< ICurrency[] >([]);

    const [name, setName] = useState("");
    const [fullName, setFullName] = useState("");
    const [area, setArea] = useState(0);
    const [population, setPopulation] = useState(0);
    const [GDP, setGDP] = useState(0);
    const [webDomain, setWebDomain] = useState("");
    const [callingCode, setCallingCode] = useState("");
    const [driving, setDriving] = useState(true);
    const [flagUrl, setFlagUrl] = useState("");

    useEffect(() => {
        axios.get<IContinent>(`${baseurl}continents`)
        .then((response : AxiosResponse)  =>
        {
            setContinents(response.data);
        } ) }, []);

    useEffect(() => {
        axios.get<ILanguage>(`${baseurl}languages`)
        .then((response : AxiosResponse)  =>
        {
            setLanguages(response.data);
        } ) }, []);

    useEffect(() => {
        axios.get<IReligion>(`${baseurl}religions`)
        .then((response : AxiosResponse)  =>
        {
            setReligions(response.data);
        } ) }, []);
    
    useEffect(() => {
        axios.get<ICity>(`${baseurl}cities`)
        .then((response : AxiosResponse)  =>
        {
            setCities(response.data);
        } ) }, []);

    useEffect(() => {
        axios.get<ICurrency>(`${baseurl}currencies`)
        .then((response : AxiosResponse)  =>
        {
            setCurrencies(response.data);
        } ) }, []);
      
    return (
        <div>
        
        Kontynent : {     
        <select value={selectedContinent} onChange={(e: any) =>{ setSelectedContinent(e.target.value)}}>
          {continents.map(({id, name}: IContinent) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }
        Język : {     
        <select value={selectedLanguage} onChange={(e: any) =>{ setSelectedLanguage(e.target.value)}}>
          {languages.map(({id, name}: ILanguage) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }
        Religia : {     
        <select value={selectedReligion} onChange={(e: any) =>{ setSelectedReligion(e.target.value)}}>
          {religions.map(({id, name}: IReligion) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }
        Stolica : {     
        <select value={selectedCity} onChange={(e: any) =>{ setSelectedCity(e.target.value)}}>
          {cities.map(({id, name}: ICity) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }
        Waluta : {     
        <select value={selectedCurrency} onChange={(e: any) =>{ setSelectedCurrency(e.target.value)}}>
          {currencies.map(({id, name, code}: ICurrency) => 
            {
              return (<option value={id}>{name}, {code} </option>)
            })}
        </select>
        }

        <label> Name: <input type="text" onChange={e=>setName(e.target.value)}></input> </label>
        <label> Full Name: <input type="text" onChange={e=>setFullName(e.target.value)}></input> </label>
        <label> Area: <input type="number" onChange={e=>setArea(Number(e.target.value))}></input> </label>
        <label> Population: <input type="number" onChange={e=>setPopulation(Number(e.target.value))}></input> </label>
        <label> GDP: <input type="number" onChange={e=>setGDP(Number(e.target.value))}></input> </label>
        <label> Web Domain: <input type="text" onChange={e=>setWebDomain(e.target.value)}></input> </label>
        <label> Calling Code: <input type="text" onChange={e=>setCallingCode(e.target.value)}></input> </label>

        <label> Flag url: <input type="text" onChange={e=>setFlagUrl(e.target.value)}></input> </label>

        name: {name}, full name: {fullName}, area: {area}, population: {population}, gdp: {GDP}, webDomain : {webDomain}, 
        calling code : {callingCode}, flagUrl: {flagUrl}
        </div>
    )
}

export default AddCountry;