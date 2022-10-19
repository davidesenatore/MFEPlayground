import { Injectable } from "@angular/core";
import { BaseWidget } from "dist/mfe-library";
import { BaseMessage } from "dist/mfe-library";

@Injectable({ providedIn: 'root' })
export class MessageBrokerService {

    private subscribers: any = {};

    //Metodo richiamato per pubblicare un evento ai sottoscrittori dello stesso.
    publish(message: BaseMessage): void {
        if (this.subscribers[message.type]) {
            for (let index = 0; index < this.subscribers[message.type].length; index++) {
                const callback = this.subscribers[message.type][index];
                callback(message);
            }
        }
    }

    //Invocata dalla pagina per sottoscrivere un evento su un componente
    //Quando un evento deve essere notificato, il broker richiama il metodo notify del componente
    subscribe(baseWidget: BaseWidget, type: string, callback: (message: BaseMessage) => any): void {
        if (!this.subscribers[type]) {
            this.subscribers[type] = [];
        }
        this.subscribers[type].push(callback.bind(baseWidget));
    }
}