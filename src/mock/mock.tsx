import Mock from 'mockjs';
// import { IProduct } from '../components/product/Product';
import Tool from '../Tool';
import { MockData } from './MockData';

// query
let queryData = function (options:any) {
    // debugger
    let arr = MockData.getInstance().mockData;
    let name:string|null=Tool.parsingUrl(options.url,'nameQry');
    let price:string|null=Tool.parsingUrl(options.url,'priceQry');
    let type:string|null=Tool.parsingUrl(options.url,'typeQry');
    let products = arr.products.filter(function (val:any) {
            //debugger;
            if(!Tool.isNullString(name)&&!val.name.includes(name||'')){
                return false;
            }
            if(!Tool.isNullString(price)&&val.price!==parseFloat(price||'0')){
                return false;
            }
            if(!Tool.isNullString(type)&&val.type!==parseInt(type||'-1')){
                return false;
            }
            return true;
    });
    //debugger
    return products
    
}
Mock.mock(RegExp('/product.*'), 'get', queryData);

// delete
let deleteData = function (options:any) {
    let arr = MockData.getInstance().mockData;
    let id = Tool.parsingUrl(options.url,'id');
    if(id){
        arr.products = arr.products.filter(
            (val:any) => val.id !== parseInt(id||'0')
        );
    }
    // debugger
    return arr.products;
}
Mock.mock(RegExp('/product.*'), 'delete', deleteData);

// add
let addData = function (options:any) {
    let arr = MockData.getInstance().mockData;
    // debugger
    if(options.body){
        let obj = JSON.parse(options.body);
        obj.id=parseInt(Math.random()*100+'');
        arr.products = [obj, ...arr.products];
    }
    
    return arr.products;
}
Mock.mock(RegExp('/product.*'), 'post', addData);

// update
let updateData = function (options:any) {
    let arr = MockData.getInstance().mockData;
    if(options.body){
        // debugger;
        let obj = JSON.parse(options.body);
        arr.products = arr.products.map((val:any) => {
            return val.id === obj.id ? obj : val;
        });
    }
    
    return arr.products;
}
Mock.mock(RegExp('/product.*'), 'put', updateData);