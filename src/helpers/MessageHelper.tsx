
const MESSAGE_QUEUE:string='message_queue';
export const SUCCESS_MESSAGE:string='success';
export const INFO_MESSAGE:string='info';
export const WARNING_MESSAGE:string='warning';
export const ERROR_MESSAGE:string='error';

export interface IMessage{
    target:string,
    type:string,
    value:string
}

export class MessageHelper{
    
    private static instance:MessageHelper=new MessageHelper();;

    private constructor(){
        // let messageQueue:string[]=[];
        // sessionStorage.setItem(MESSAGE_QUEUE,JSON.stringify(messageQueue));
    }

    public  static getInstance():MessageHelper{
        return MessageHelper.instance;
    }

    private GetMessageQueue():IMessage[] {
        let messageQueue:IMessage[]=[];
        let messageQueueStr = sessionStorage.getItem(MESSAGE_QUEUE);
        if (messageQueueStr) {
            messageQueue = JSON.parse(messageQueueStr);
        }else{
            sessionStorage.setItem(MESSAGE_QUEUE,JSON.stringify(messageQueue));
        }
        return messageQueue;
    }

    public PushMessage(target:string,type:string,value:string):void{
        // debugger
        let messageQueue:IMessage[]=this.GetMessageQueue();
        messageQueue.push({target,type,value});
        sessionStorage.setItem(MESSAGE_QUEUE,JSON.stringify(messageQueue));
    }

    public GetMessage(target:string):IMessage[]{
        //debugger
        let mReturn:IMessage[]=[];
        let messageQueue:IMessage[]=this.GetMessageQueue();
        let length:number=messageQueue.length;
        while(length-->0){
            let msg=messageQueue.shift()
            if(msg){
                if(msg.target.toLowerCase()===target.toLowerCase()){
                    mReturn.push(msg);
                }else{
                    messageQueue.push(msg);
                }
                
            }
        }
        sessionStorage.setItem(MESSAGE_QUEUE,JSON.stringify(messageQueue));
        return mReturn;
    }
}