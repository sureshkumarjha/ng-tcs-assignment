import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  messageQueue : Array<{ to:string, from:string, message:any}>;
  constructor() { 
    this.messageQueue = [];
  }

  putMessage(msg: { to:string, from:string, message:any} ){
    this.messageQueue.push(msg);
  }

  getMessage(component:string){
    let idx = 0;
    for(let msg of this.messageQueue){
      if(msg.to === component){
        this.messageQueue.splice(idx);
        return msg;
      }
      idx++;
    }
    return null;
  }

}
