import {UPDATE_PRODUCT_PARAMETER, QUERY_PRODUCT, UPDATE_PRODUCT,ADD_PRODUCT,DELETE_PRODUCT} from './ActionTypes';
import HttpHelper from '../helpers/HttpHelper';
import tool from '../Tool';
import '../mock/mock';
import axios from 'axios';

export const updateProductParameterAction=(value:any):any=>{
    const action = {
        type:UPDATE_PRODUCT_PARAMETER,
        value:value
    }
    return action;
}

function getUrl(nameQry:string,priceQry:string,typeQry:string):string{
    let apiUrl = '';
    let url:string = `${apiUrl}/product`;
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

export const queryProductAction=():any=>{

    return (dispatch:any,getState:any)=>{
        //debugger;
        var httpHelper = HttpHelper.getInstance();
        
        const state=getState();

        let nameQry=state.ProductReducer.nameQry;
        let priceQry=state.ProductReducer.priceQry;
        let typeQry=state.ProductReducer.typeQry;
        
        
        let url = getUrl(nameQry,priceQry,typeQry);
        queryDataByHttp(httpHelper,url,dispatch);
    };
}

export const addProductAction=(product:string):any=>{
    return (
        async (dispatch:any,getState:any)=>{
            let httpHelper = HttpHelper.getInstance();
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;

            let url = getUrl('','','');

            await httpHelper.post(url, '', product)
                .then(data => {
                    alert(data['msg']);
                });

            url = getUrl(nameQry,priceQry,typeQry);
            queryDataByHttp(httpHelper, url, dispatch);
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
            queryDataByHttp(httpHelper, url, dispatch);
        }
    );
}

export  const deleteProductAction=(productId:any):any=>{
    return (
        async (dispatch:any,getState:any)=>{
            let httpHelper = HttpHelper.getInstance();
            const state=getState();
            let nameQry=state.ProductReducer.nameQry;
            let priceQry=state.ProductReducer.priceQry;
            let typeQry=state.ProductReducer.typeQry;

            let apiUrl = getUrl('','','');
            let url = `${apiUrl}/${productId}`;
            console.log(`execute delete ${url}`);
            await httpHelper.delete(url, '')
                .then(message => {
                    alert(message);
                });
                
                
            url = getUrl(nameQry,priceQry,typeQry);
            queryDataByHttp(httpHelper, url, dispatch);
        }
    );
}

async function queryDataByHttp(httpHelper: HttpHelper, url: string, dispatch: any) {
    debugger;
    const res = axios({
        method: 'GET',
        url: url,
        params:{nameQry:'',priceQry:'',typeQry:''},
    })
    .then(res => {
        let products = res?.data?.value;
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