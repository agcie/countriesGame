import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCountry from './addCountry';
import ListCountries from './listCountries';


const CountryMain = () => {
    return (
        <div>
        <h1>Country</h1>
        <Grid container spacing={2} >
        <Grid item xs={2}>
            <AddCountry/>
        </Grid>
        <Grid item xs={10}>
            <ListCountries/>
        </Grid>
        </Grid>
        </div>
    )
}

export default CountryMain;