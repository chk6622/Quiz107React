import {UPDATE_PRODUCT_PARAMETER, QUERY_PRODUCT} from './ActionTypes';
import { IProductState } from './IState';
import { IAction } from './IAction';

const initState:IProductState={
    nameQry: null,
    priceQry: null,
    typeQry:null,
    products: [],
    
}

export default (state=initState,action:IAction):IProductState=>{
    let newState:IProductState=JSON.parse(JSON.stringify(state));
    switch(action.type){
        case UPDATE_PRODUCT_PARAMETER:
            newState={...newState,...action.value};
            break;
        case QUERY_PRODUCT:
            newState={...newState,...action.value};
            break;
    }
    return newState;
}