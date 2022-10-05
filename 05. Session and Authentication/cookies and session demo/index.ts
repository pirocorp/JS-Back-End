import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const app = express();

app.use(cookieParser());

const sessionOptions = {
    secret: 'V3ry hard $ecret!',
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false,
} as session.SessionOptions;

app.use(session(sessionOptions));

app.get('/', (req, res) => {
    req.session.visited = (req.session.visited || 0) + 1;    
    res.send(`Hello. Visit counter: ${req.session.visited}`);
    
    console.log(req.session);
});

app.listen(3000);
