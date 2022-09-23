import * as actionTypes from './continentTypes'
import IContinent from '../../api-ifc/IContinent'

export interface IContinentReducer{
    continentList: IContinent[];
}

const defaultState = (): IContinentReducer =>({
    continentList: []
})

export default (state = defaultState(), action: any) =>{
    switch(action.type){
        case actionTypes.GET_CONTINENTS:{
            const data: actionTypes.IContinentTypes["GET_CONTINENTS"] = action;
            console.log(action);
            return{
                ...state,
                commentList: action.list
            }
        }
        default:{
            return state;
        }
    }
}