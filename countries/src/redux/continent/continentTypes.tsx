import IContinent from "../../routes/add/api-ifc/IContinent";


export const GET_CONTINENTS = 'GET_CONTINENTS';


export interface IContinentTypes{
    GET_CONTINENTS:{
        continentList: IContinent[],
    }
    ADD_CONTINENT:{
        
    }
}