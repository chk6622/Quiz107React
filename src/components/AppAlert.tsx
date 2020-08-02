import React from 'react';
import {MessageHelper,IMessage,SUCCESS_MESSAGE,INFO_MESSAGE,WARNING_MESSAGE,ERROR_MESSAGE} from '../helpers/MessageHelper';
import { Alert,message } from 'antd';


export default function AppAlert(props:any){

    let messages:IMessage[]=[];
    let target:string = props.target;

    let messageHelper=MessageHelper.getInstance();
    let msg=messageHelper.GetMessage(target);
    if(msg&&msg.length>0){
        messages=msg;
    }

    let renderStr:any ='';
    for(let msg of messages){
        let messageType:'success'|'info'|'warning'|'error'|undefined=undefined;
        switch(msg.type){
            case SUCCESS_MESSAGE:
                messageType='success';
                message.success(msg.value,3);
                break;
            case INFO_MESSAGE:
                messageType='info';
                message.info(msg.value,3);
                break;
            case WARNING_MESSAGE:
                messageType='warning';
                message.warning(msg.value,3);
                break;
            case ERROR_MESSAGE:
                messageType='error';
                message.error(msg.value,3);
                break;
            default:
                messageType=undefined;
                break;
        }
        renderStr=<Alert message={msg.value} type={messageType} banner showIcon closable/>
    }

debugger;
    return <>{renderStr}</>;
    
}