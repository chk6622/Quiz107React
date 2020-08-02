import {UPDATE_PRODUCT_PARAMETER, QUERY_PRODUCT} from './ActionTypes';
import tool from '../Tool';
import '../mock/mock';
import axios from 'axios';
import { MessageHelper, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../helpers/MessageHelper';

axios.defaults.baseURL='http://localhost:8080'
let messageHelper=MessageHelper.getInstance();


export const updateProductParameterAction=(value:any):any=>{
    const action = {
        type:UPDATE_PRODUCT_PARAMETER,
        value:value
    }
    return action;
}

// function getUrl(nameQry:string,priceQry:string,typeQry:string):string{
//     let url:string = `/product`;
//     if (!tool.isNullString(nameQry)) {
//         url += '&nameQry=' + nameQry;
//     }
//     if (!tool.isNullString(priceQry)) {
//         url += '&priceQry=' + priceQry;
//     }
//     if(!tool.isNullString(typeQry)){
//         url += '&typeQry=' + typeQry;
//     }
//     return url;
// }

function getQueryParameter(nameQry:string,priceQry:string,typeQry:string):any{
    let oReturn:any={};
    if (!tool.isNullString(nameQry)) {
        oReturn.nameQry=nameQry;
    }
    if (!tool.isNullString(priceQry)) {
        oReturn.priceQry=priceQry;
    }
    if(!tool.isNullString(typeQry)){
        oReturn.typeQry=typeQry;
    }
    return oReturn;
}

export const queryProductAction=():any=>{

    return (dispatch:any,getState:any)=>{
        // debugger;
        
        const state=getState();

        let nameQry=state.ProductReducer.nameQry;
        let priceQry=state.ProductReducer.priceQry;
        let typeQry=state.ProductReducer.typeQry;
        
        let queryParams = getQueryParameter(nameQry,priceQry,typeQry)
        let url = '/product';
        queryDataByHttp(url,queryParams,dispatch);
    };
}

export const addProductAction=(product:string):any=>{
    return (
        async (dispatch:any,getState:any)=>{
            let messageTarget:string = 'add product';
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;

            let url = '/product';
            axios({
                method: 'POST',
                url: url,
                data:JSON.stringify(product),
            })
            .then(res => {
                res.status === 200||201 ? messageHelper.PushMessage(messageTarget,SUCCESS_MESSAGE,'Add success!') : messageHelper.PushMessage(messageTarget,ERROR_MESSAGE,'Add fail!');
                let queryParams=getQueryParameter(nameQry,priceQry,typeQry);
                url = '/product';
                queryDataByHttp(url,queryParams,dispatch);
            })
            .catch(err => {
                console.log(err);
                messageHelper.PushMessage(messageTarget,ERROR_MESSAGE,'Add failed!');
            });
            
        }
    );
}

export const updateProductAction=(product:any):any=>{
    
    return (
        async (dispatch:any,getState:any)=>{
            let messageTarget:string = 'update product';
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;
            // debugger;
            let url = '/product';
            axios({
                method: 'PUT',
                url: url,
                data:JSON.stringify(product),
            })
            .then(res => {
                res.status === 200||201 ? messageHelper.PushMessage(messageTarget,SUCCESS_MESSAGE,'Update success!') : messageHelper.PushMessage(messageTarget,ERROR_MESSAGE,'Update fail!');
                let queryParams=getQueryParameter(nameQry,priceQry,typeQry);
                url = '/product';
                queryDataByHttp(url,queryParams,dispatch);
            })
            .catch(err => {
                console.log(err);
                messageHelper.PushMessage(messageTarget,ERROR_MESSAGE,'Update failed!');
            });
        }
    );
}

export  const deleteProductAction=(productId:string):any=>{
    return (
        async (dispatch:any,getState:any)=>{
            let messageTarget:string = 'delete product';
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;

            

            // let apiUrl = getUrl('','','');
            let url = `/product/${productId}`;
            // console.log(`execute delete ${url}`);
            axios({
                method: 'DELETE',
                url: url,
            })
            .then(res => {
                // console.log(res)
                switch (res.status) {
                    case 200:
                    case 204:
                        // debugger
                        messageHelper.PushMessage(messageTarget,SUCCESS_MESSAGE,'Delete success!');
                        break;
                    default:
                        messageHelper.PushMessage(messageTarget,ERROR_MESSAGE,'Delete failed!');
                }
                let queryParams=getQueryParameter(nameQry,priceQry,typeQry)
                url = '/product';
                queryDataByHttp(url,queryParams,dispatch);
            })
            .catch(err => {
                console.log(err);
                messageHelper.PushMessage(messageTarget,ERROR_MESSAGE,'Delete failed!');
            });
        }
    );
}

async function queryDataByHttp(url: string, queryParams:string, dispatch: any) {
    // debugger;
    axios({
        method: 'GET',
        url: url,
        params:queryParams,
    })
    .then(res => {
        // console.log(res)
        let products = res?.data;
        let value = {
                products,
                loading: false
            };
        const action = {
                type: QUERY_PRODUCT,
                value
        };
        dispatch(action);
    })
    .catch(err => {console.log(err)});
}