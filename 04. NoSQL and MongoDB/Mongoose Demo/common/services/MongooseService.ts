import mongoose from 'mongoose';

const connectionString = "mongodb://localhost:27017/testdb2";
const log = console.log;

class MongooseService {
    private retrySeconds = 5;    
    private count = 0;

    constructor() {

        this.connectWithRetry();
    };

    public get instance() {
        return mongoose;
    };

    private connectWithRetry () {
        log('Attempting MongoDB connection (will retry if needed)');

        mongoose
            .connect(connectionString)
            .then(() => log('MongoDB is connected'))
            .catch(err => {
                log(`MongoDB connection unsuccessful (will retry #${++this.count} after ${this.retrySeconds} seconds): ${err}`);
                setTimeout(this.connectWithRetry, this.retrySeconds * 1000);
                this.retrySeconds *= 1.5;
            });
    };
};

// Modules are only evaluated once.
export default new MongooseService();