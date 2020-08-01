import Mock, { Random } from 'mockjs';
import { ProductType, IProduct } from '../components/Product';
import Tool from '../Tool';

class MockData{
    private static instance:MockData = new MockData();

    public mockData:any = null;

    private constructor(){
        this.mockData = Mock.mock({"products|10":[{    

                      "id|+1":1,  
            
                      "name|1":['product1','product2','product3','product4','product5','product6','product7','product8','product9','product10'],    
            
                      "price|18-28.1":25,    
            
                      "type|1":[ProductType.Hardware,ProductType.Software],    
            
                      "description|5-15":"abc"    
            
                  }]})
    }

    public static getInstance():MockData{
        return MockData.instance;
    }
}
 


// query
let queryData = function (options:any) {
    debugger
    let arr = MockData.getInstance().mockData;
    let name:string|null=Tool.parsingUrl(options.url,'nameQry');
    let price:string|null=Tool.parsingUrl(options.url,'priceQry');
    let type:string|null=Tool.parsingUrl(options.url,'typeQry');
    let products = arr.products.filter(function (val:IProduct) {
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
    debugger
    return arr.products;
}
Mock.mock(RegExp('/product.*'), 'delete', deleteData);

// add
let addData = function (options:any) {
    let arr = MockData.getInstance().mockData;
    debugger
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
    let obj = JSON.parse(options.body).params.obj;
    arr = arr.map((val:any) => {
        return val.id === obj.id ? obj : val;
    });
    return {
        data: arr
    }
}
Mock.mock('/product', 'put', updateData);