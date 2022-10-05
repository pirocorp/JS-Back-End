import express from 'express';
import session from 'express-session';
import { IUserSession } from './interfaces/IUserSession';

import * as userService from './services/usersService';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'V3ry hard $ecret!',
    saveUninitialized: true,
    cookie: { secure: false },
    resave: false,
}));

app.get('/', (req, res) => {
    console.log('>>> User: ' + JSON.stringify(req.session.user, null, '\t'));
    res.send(homeTemplate(req.session.user, userService.users));
});

app.get('/login', (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form action="/login" method="post">
            <label>
                Username: <input type="text" name="username" />
            </label>
            <label>
                Password: <input type="password" name="password" />
            </label>
            <input type="submit" value="Log in" />
        </form>`
    );
});

app.post('/login', async (req, res) => {
    try {
        await userService.login(req.body.username, req.body.password);

        req.session.user = {
            username: req.body.username
        };

        res.redirect('/');
    } catch (error) {
        res.status(401).send('Invalid credentials');
    }
});

app.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

app.get('/register', (req, res) => {
    res.send(registerTemplate(null));
});

app.post('/register', async (req, res) => {
    try {

        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All fields are required');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match');
        }

        await userService.register(req.body.username, req.body.password);
        res.redirect('/');
    } catch (error: any) {
        res.send(registerTemplate(error.message));
    }
});

app.listen(3000);

const registerTemplate = (error: string | null) => `
    <h1>Register</h1>
    ${error ? `<p>${error}</p>` : ''}
    <form action="/register" method="post">
        <label>
            Username: <input type="text" name="username" />
        </label>
        <label>
            Password: <input type="password" name="password" />
        </label>
        <label>
            Confirm Password: <input type="password" name="repass" />
        </label>
        <input type="submit" value="Register" />
    </form>`;

const homeTemplate = (user: IUserSession | undefined, users: userService.IUser[]) => `
    <h1>Welcome, ${user?.username || 'guest'}</h1>
    ${user == undefined ? `<p>Please <a href="/login">login</a> or <a href="/register">register</a></p>`: '<a href="logout">logout</a>'}
    <ul>
        ${users.map(u => `<li>${u.username}</li>`).join('\n')}
    </ul>
`;

