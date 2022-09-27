import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import ICity from '../../api-ifc/ICity';
import IContinent from '../../api-ifc/IContinent';
import ICurrency from '../../api-ifc/ICurrency';
import ILanguage from '../../api-ifc/ILanguage';
import IReligion from '../../api-ifc/IReligion';

const baseurl ="http://localhost:8000/";

const AddCountry = () => {
    const [selectedContinent, setSelectedContinent] = useState(1);
    const [continents, setContinents] = useState< IContinent[] >([]);
    const [selectedLanguage, setSelectedLanguage] = useState(["1"]);
    const [languages, setLanguages] = useState< ILanguage[] >([]);
    const [selectedReligion, setSelectedReligion] = useState(["1"]);
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
    const [err, setErr] = useState("");

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


    const handleReligion = (e: any) =>
    {
      setSelectedReligion(
        [...e.target.options].filter((e : any )=> e.selected).map((e : any )=> e.value)
      );
    }
      
    const handleLanguage = (e: any) =>
    {
      setSelectedLanguage(
        [...e.target.options].filter((e : any )=> e.selected).map((e : any )=> e.value)
      );
    }

    const handleAdd = (e:  React.FormEvent) =>{
        e.preventDefault();
        console.log({
            name: name,
            full_name: fullName,
            capital_city: Number(selectedCity),
            area: area,
            population: population,
            currency: selectedCurrency,
            GDP: GDP,
            continent: selectedContinent,
            language: [selectedLanguage],
            web_domain: webDomain,
            calling_code: callingCode,
            religion: [selectedReligion],
            driving_on_right: driving,
            flag_url: flagUrl
            })
        axios.post(`${baseurl}countries/`,
            {
            name: name,
            full_name: fullName,
            capital_city: Number(selectedCity),
            area: area,
            population: population,
            currency: selectedCurrency,
            GDP: GDP,
            continent: selectedContinent,
            language: selectedLanguage,
            web_domain: webDomain,
            calling_code: callingCode,
            religion: selectedReligion,
            driving_on_right: driving,
            flag_url: flagUrl
            }
        )
        .then((respone) => console.log(respone))
        .catch((err) => setErr(err))
        }

          
    return (
        <div>
        <form onSubmit={handleAdd}>
        Kontynent : {     
        <select value={selectedContinent} onChange={(e: any) =>{ setSelectedContinent(e.target.value)}}>
          {continents.map(({id, name}: IContinent) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }<br/>
        Język : {     
        <select value={selectedLanguage}  multiple={true}  onChange={(e: any) =>{ handleLanguage(e)}}>
          {languages.map(({id, name}: ILanguage) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }<br/>
        Religia : {     
        <select value={selectedReligion}  multiple={true} onChange={(e: any) =>{ handleReligion(e)}}>
          {religions.map(({id, name}: IReligion) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }<br/>
        Stolica : {     
        <select value={selectedCity} onChange={(e: any) =>{ setSelectedCity(e.target.value)}}>
          {cities.map(({id, name}: ICity) => 
            {
              return (<option value={id}>{name}</option>)
            })}
        </select>
        }<br/>
        Waluta : {     
        <select value={selectedCurrency} onChange={(e: any) =>{ setSelectedCurrency(e.target.value)}}>
          {currencies.map(({id, name, code}: ICurrency) => 
            {
              return (<option value={id}>{name}, {code} </option>)
            })}
        </select>
        }<br/>

        <label> Name: <input type="text" onChange={e=>setName(e.target.value)}></input> </label> <br/>
        <label> Full Name: <input type="text" onChange={e=>setFullName(e.target.value)}></input> </label><br/>
        <label> Area: <input type="number" onChange={e=>setArea(Number(e.target.value))}></input> </label><br/>
        <label> Population: <input type="number" onChange={e=>setPopulation(Number(e.target.value))}></input> </label><br/>
        <label> GDP: <input type="number" onChange={e=>setGDP(Number(e.target.value))}></input> </label><br/>
        <label> Web Domain: <input type="text" onChange={e=>setWebDomain(e.target.value)}></input> </label><br/>
        <label> Calling Code: <input type="text" onChange={e=>setCallingCode(e.target.value)}></input> </label><br/>

        <label> Flag url: <input type="text" onChange={e=>setFlagUrl(e.target.value)}></input> </label><br/>
        <label>Driving onright? <input type="checkbox" checked={driving}  
          onChange={() => setDriving((prev) => !prev)}/> </label><br/>

        {/* name: {name}, full name: {fullName}, area: {area}, population: {population}, gdp: {GDP}, webDomain : {webDomain}, 
        calling code : {callingCode}, flagUrl: {flagUrl} */}

{selectedCity}
        <input type="submit" value="Submit" />
      </form>
      {err.toString()}
        </div>

    )
}

export default AddCountry;