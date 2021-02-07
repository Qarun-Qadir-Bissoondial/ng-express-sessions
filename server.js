const express = require('express');
const expressSession = require('express-session');
const { hasRequiredParams } = require('./middleware/util');
const { createSuccess, createFailure } = require('./responses');

const HOUR_MS = 60 * 60 * 1000;
const app = express();
app.use(expressSession({ // TODO: Research more about config object
    name: 'sid',
    secret: 'doggo',
    cookie: {
        maxAge:  HOUR_MS,
        sameSite: true,
        secure: false, // TODO: Get environment from NODE_ENV/process.env and determine if secure or not
    },
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());

const users = []; // TODO: Hook up to store and retrieve active sessions

app.get('/info', (req, res) => { // TODO: debugging purposes, only trigger in dev
    req.session.viewCount++;
    res.status(200).send({ session: req.session });
})

app.post('/login', hasRequiredParams('email', 'password') , (req, res) => { // TODO: Implement Redis/Postgres Store


});

app.post('/register', hasRequiredParams('email', 'password', 'name'), (req, res) => { 

    const { name, email, password } = req.body;

    if (users.find(u => u.email === email)) { // TODO: Make this code into a middleware
        return res.status(403).send(createFailure('User already exists'))
    }

    // create user

    const newUser = {
        id: users.length + 1, // TODO: Generate proper IDs
        name,
        email,
        password
    };

    req.session.userId = newUser.id;
    users.push(newUser);
    return res.status(201).send(createSuccess('User successfully registered'));

});

app.get('/user', (req, res) => {
    const { userId } = req.session; // TODO: Check if person is in session, else return 401
    const user = users.find(u => u.id === userId);
    res.status(200).send(createSuccess(user))
});

app.listen(8080, () => { console.log("listening on port 8080"); }) // TODO: Get port from NODE_ENV