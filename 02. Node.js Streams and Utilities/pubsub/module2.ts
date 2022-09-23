import * as observer from "./observer";
import emitter from "./eventObserver";

export function produce() {
    let counter = 0;

    setInterval(() => {
        emitter.emit('message', counter++);
        //observer.publish('message', counter++);
    }, 2000);
}
