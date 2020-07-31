import Mock from 'mockjs';
import { ProductType,IProduct } from '../components/Product';
import Tool from '../Tool';

// mock data list
 let arr:any = Mock.mock({"products|10":[{    

              "id|+1":1,  
    
              "name|1":['product1','product2','product3','product4','product5','product6','product7','product8','product9','product10'],    
    
              "price|18-28.1":25,    
    
              "type|1":["hardware","software"],    
    
              "description|5-15":"abc"    
    
          }]})
console.log(arr);
 


// query
let queryData = function (options:any) {
    let name:string|null=Tool.getUrlParams(options.url,'nameQry');;
    let price:string|null=Tool.getUrlParams(options.url,'priceQry');;
    let products = arr.products.filter(function (val:IProduct) {
            //debugger;
            if(!Tool.isNullString(name)&&!val.name.includes(name===null?'':name)){
                return false;
            }
            if(!Tool.isNullString(price)&&val.price!==parseFloat(price===null?'0':price)){
                return false;
            }
            return true;
    });
    //debugger
    return {
        code:200,
        value: products
    }
}
Mock.mock(RegExp('/product.*'), 'get', queryData);

// get product
let findData = function (options:any) {
    //debugger;
    let id = parseInt(JSON.parse(options.body).params.id); 
    arr = arr.filter(function (val:any) {
            return val.id != id;
    });
    let oReturn:any=null;
    if(arr.length>0){
        oReturn=arr[0];
    }

    return {
            code:200,
            data:oReturn
        }
    
    
}
//Mock.mock('/product/{id}', 'GET', findData);

// delete
let deleteData = function (options:any) {
    // console.log(options.type);
    let id = parseInt(JSON.parse(options.body).params.id); 
    arr = arr.filter(function (val:any) {
            return val.id != id;
    });
    return {
        data: arr
    }
}
Mock.mock('/product', 'DELETE', deleteData);

// add
let addData = function (options:any) {
    let obj = JSON.parse(options.body).params.obj;
    arr = [obj, ...arr];
    return {
        data: arr
    }
}
Mock.mock('/product', 'POST', addData);

// update
let updateData = function (options:any) {
    let obj = JSON.parse(options.body).params.obj;
    arr = arr.map((val:any) => {
        return val.id == obj.id ? obj : val;
    });
    return {
        data: arr
    }
}
Mock.mock('/product', 'PUT', updateData);