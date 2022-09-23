import React from 'react';
import ContinentMain from './forms/continent/continentMain';
import CityMain from './forms/city/cityMain';
import LanguageMain from './forms/language/languageMain';
import ReligionMain from './forms/religion/religionMain';
import CurrencyMain from './forms/currency/currencyMain';

const App = () => {
  return (
    <div className="App">
      <ContinentMain/>
      <CityMain/>
      <ReligionMain/>
      <CurrencyMain/>
      <LanguageMain/>
    </div>
  );
}

export default App;
