// IMPORTS ---------------------------------------------------------------

const express = require('express');
const expressSession = require('express-session');
const { isLoggedIn } = require('./middleware/auth');
const { hasRequiredParams } = require('./middleware/util');
const { createSuccess, createErrResponse } = require('./responses');


// CONSTANTS/ENV STUFF ---------------------------------------------------

const HOUR_MS = 60 * 60 * 1000;


// FUNCTIONS (TODO: SEPARATE LATER) --------------------------------------

const userExists = (id, email) => users.find(u => u.id === id || u.email === email);


// SETUP -----------------------------------------------------------------

const users = [ // TODO: Hook up to store and retrieve active sessions
    { email: 'someone@example.com', password: 'secret', id: 1, name: 'Potato man' }
]; 
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


// ROUTES ----------------------------------------------------------------

app.get('/info', (req, res) => { // TODO: debugging purposes, only trigger in dev
    req.session.viewCount++;
    res.status(200).send({ session: req.session });
})

app.post('/login', hasRequiredParams('email', 'password') , (req, res) => { // TODO: Implement Redis/Postgres Store
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if  (!user) {
        return createErrResponse(res, 401, 'Invalid Credentials');
    }

    req.session.userId = user.id;
    res.status(200).send(createSuccess('Login Successful'));
});

app.post('/register', hasRequiredParams('email', 'password', 'name'), (req, res) => { 

    const { name, email, password } = req.body;

    if (userExists(undefined, email)) {
        return createErrResponse(res, 403, 'Email is unavailable');
    }

    // create user

    const newUser = {
        id: users.length + 1, // TODO: Generate proper IDs
        name,
        email,
        password // TODO: Hash passwords and stuff
    };

    req.session.userId = newUser.id;
    users.push(newUser);
    return res.status(201).send(createSuccess('User successfully registered'));

});

app.get('/user', isLoggedIn, (req, res) => {
    const { userId } = req.session; // TODO: Check if person is in session, else return 401
    const user = userExists(userId);
    res.status(200).send(createSuccess(user))
});

app.post('/logout', isLoggedIn, (req, res) => { // TODO: Remove session from database
    delete req.session.userId;
    
    req.session.destroy(err => {
        if (err) {
            createErrResponse(res, 500, 'Failed to log out')
        }

        res.status(200).send(createSuccess('Logged out succesfully'));
    });
});


// LISTENER --------------------------------------------------------------

app.listen(8080, () => { console.log("listening on port 8080"); }) // TODO: Get port from NODE_ENV