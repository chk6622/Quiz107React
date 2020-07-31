export default class Tool{

    public static isNullString(str:string|null|undefined):boolean{
        let bReturn: boolean = false;
        if (str===null||str===undefined||str.replace(/(^s*)|(s*$)/g, "").length ===0)
        {
        
            bReturn=true;
        
        }
        return bReturn;
    }

    public static  getUrlParams(url:string,name:string):string|null{
        url=url.toLowerCase();
        name=name.toLowerCase();
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');    
        let r = url.match(reg);    
        if (r != null) {        
            return unescape(r[2]);    
        }    
        return null;
    }
}