import {UPDATE_PRODUCT_PARAMETER, QUERY_PRODUCT, UPDATE_PRODUCT,ADD_PRODUCT,DELETE_PRODUCT} from './ActionTypes';
import HttpHelper from '../helpers/HttpHelper';
import tool from '../Tool';
import '../mock/mock';
import axios from 'axios';

axios.defaults.baseURL='http://localhost:8080'

export const updateProductParameterAction=(value:any):any=>{
    const action = {
        type:UPDATE_PRODUCT_PARAMETER,
        value:value
    }
    return action;
}

function getUrl(nameQry:string,priceQry:string,typeQry:string):string{
    let url:string = `/product`;
    if (!tool.isNullString(nameQry)) {
        url += '&nameQry=' + nameQry;
    }
    if (!tool.isNullString(priceQry)) {
        url += '&priceQry=' + priceQry;
    }
    if(!tool.isNullString(typeQry)){
        url += '&typeQry=' + typeQry;
    }
    return url;
}

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
        debugger;
        
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
                alert(res.status === 200||201 ? 'Add success!' : 'Add fail!');
                let queryParams=getQueryParameter(nameQry,priceQry,typeQry);
                url = '/product';
                queryDataByHttp(url,queryParams,dispatch);
            })
            .catch(err => {
                console.log(err);
                alert('Add failed!')
            });
            

            url = getUrl(nameQry,priceQry,typeQry);
            // queryDataByHttp( url, dispatch);
        }
    );
}

export const updateProductAction=(product:any):any=>{
    
    return (
        async (dispatch:any,getState:any)=>{
            let httpHelper = HttpHelper.getInstance();
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;

            let url = getUrl('','','');
            // console.log(`execute Update ${url}`);
            await httpHelper.put(url, '', product)
                .then(data => {
                    alert(data['msg']);
                });

            url = getUrl(nameQry,priceQry,typeQry);
            // queryDataByHttp( url, dispatch);
        }
    );
}

export  const deleteProductAction=(productId:string):any=>{
    return (
        async (dispatch:any,getState:any)=>{
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;

            let apiUrl = getUrl('','','');
            let url = `${apiUrl}/${productId}`;
            console.log(`execute delete ${url}`);
            axios({
                method: 'DELETE',
                url: url,
            })
            .then(res => {
                console.log(res)
                switch (res.status) {
                    case 200:
                    case 204:
                        alert('Delete success!');
                        break;
                    default:
                        alert('Delete failed!');
                }
                let queryParams=getQueryParameter(nameQry,priceQry,typeQry)
                url = '/product';
                queryDataByHttp(url,queryParams,dispatch);
            })
            .catch(err => {
                console.log(err);
                alert('Delete failed!')
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
        console.log(res)
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