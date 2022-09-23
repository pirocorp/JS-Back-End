let subscribers:{
    [key: string]: ((data: any) => void)[];
} = {};

export function subscribe(type: string, callback: (data: any) => void) {
    console.log(`>>> Subscribing for ${type}`);    

    if(subscribers[type] == undefined){
        subscribers[type] = [];
    }

    subscribers[type].push(callback);
}

export function publish(type: string, data: any) {
    console.log(`>>> Observer received type ${type}`);    

    const currentSubscribers = subscribers[type];

    if(currentSubscribers){
        for (const subscriber of currentSubscribers) {
            subscriber(data);
        }
    }
}