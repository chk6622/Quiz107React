export default class Tool{

    public static isNullString(str:string|null|undefined):boolean{
        let bReturn: boolean = false;
        if (str===null||str===undefined||(typeof(str)==='string'&&str.replace(/(^s*)|(s*$)/g, "").length ===0))
        {
        
            bReturn=true;
        
        }
        return bReturn;
    }

    // public static  getUrlParams(url:string,name:string):string|null{
    //     url=url.toLowerCase();
    //     name=name.toLowerCase();
    //     let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');    
    //     let r = url.match(reg);    
    //     if (r != null) {        
    //         return unescape(r[2]);    
    //     }    
    //     return null;
    // }

    public static  parsingUrl(url:string,name:string):string|null{
        let sReturn:string|null =null;
        url=url.toLowerCase();
        name=name.toLowerCase();
        //debugger
        const searchURL = new URL(url);
        const { pathname, searchParams } = searchURL;
        if(name==='id'){
            let pathes:string[]=pathname.split('/')
            if(pathes!==null&&pathes.length>0){
                sReturn = pathes[pathes.length-1]
            }
        }
        else{
            sReturn=searchParams.get(name);
        }
        return sReturn
    }
}