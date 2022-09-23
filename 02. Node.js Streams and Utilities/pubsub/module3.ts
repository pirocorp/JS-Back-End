import emitter from "./eventObserver";
import * as observer from "./observer";

export function listen() {
    let runningTotal = 0;
    const type = 'message';
    
    console.log(`>>> Module 3 subscribed for type ${type}`);

    const callback = (data: any) => {
        runningTotal += data;
        console.log(`>>> Module 3: Current value ${runningTotal}`);    
    };

    //observer.subscribe(type, callback);
    emitter.on(type, callback);
}