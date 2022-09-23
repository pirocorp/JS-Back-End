import * as observer from "./observer";
import emitter from "./eventObserver";

export function listen() {
    const type = 'message';

    console.log(`>>> Module 1 subscribed for type ${type}`);

    const callback = (data: any) => {
        console.log(`>>> Module 1: received ${data}`);    
    };

    //observer.subscribe(type, callback);
    emitter.on(type, callback);
};