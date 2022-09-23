import IContinent from "../../api-ifc/IContinent";
import * as actionTypes from './continentTypes';
import { Dispatch } from "@reduxjs/toolkit";

export const getContinents = () => ((dispatch: Dispatch) => {
    
    return fetch("http://127.0.0.1:8000/continents/")
    .then(response => response.json())
    .then((list: IContinent[]) =>{
        console.log(list);
        dispatch(
        {
            type: actionTypes.GET_CONTINENTS,
            list
        })
    })
}) as any;