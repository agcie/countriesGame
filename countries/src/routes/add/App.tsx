import React from 'react';
import ContinentMain from './forms/continent/continentMain';
import CityMain from './forms/city/cityMain';
import LanguageMain from './forms/language/languageMain';
import ReligionMain from './forms/religion/religionMain';
import CurrencyMain from './forms/currency/currencyMain';
import { Grid } from '@mui/material';
import CountryMain from './forms/country/countryMain';


const App = () => {
  return (
    <div className="App">
      <Grid container spacing={1} >
        <Grid item xs={3}>
          <ContinentMain/>
        </Grid>
        <Grid item xs={3}>
        <LanguageMain/>
        </Grid>
        <Grid item xs={4}>
        <ReligionMain/>
        </Grid>
      </Grid>
      <Grid container spacing={2} >
      <Grid item xs={6}>
      <CurrencyMain/>
      </Grid>
      <Grid item xs={6}>
      <CityMain/>
      </Grid>
      </Grid>

      <CountryMain/>
    </div>
  );
}

export default App;
