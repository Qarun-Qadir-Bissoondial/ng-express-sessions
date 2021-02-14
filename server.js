// IMPORTS ---------------------------------------------------------------

const express = require('express');
const { isLoggedIn } = require('./middleware/auth');
const { createSuccess, createErrResponse } = require('./responses');
const db = require('./db/init');
const sessionConfig = require('./sessions/init')(db);
const userRoutes = require('./routes/users')(express, db.models);
console.log(db.models);


// FUNCTIONS (TODO: SEPARATE LATER) --------------------------------------

// const userExists = (id, email) => users.find(u => u.id === id || u.email === email);


// ATTACH MIDDLEWARE -----------------------------------------------------

// const users = [ // TODO: Hook up to store and retrieve active sessions
//     { email: 'someone@example.com', password: 'secret', id: 1, name: 'Potato man' }
// ]; 

const app = express();
app.use(sessionConfig.middleware);
app.use(express.json());
app.use('/users', userRoutes);


sessionConfig.sync();

// ROUTES ----------------------------------------------------------------

app.get('/info', (req, res) => { // TODO: debugging purposes, only trigger in dev
    req.session.viewCount++;
    res.status(200).send({ session: req.session });
})

// app.post('/login', hasRequiredParams('email', 'password') , (req, res) => { // TODO: Implement Redis/Postgres Store
//     const { email, password } = req.body;
//     const user = users.find(u => u.email === email && u.password === password);

//     if  (!user) {
//         return createErrResponse(res, 401, 'Invalid Credentials');
//     }

//     req.session.userId = user.id;
//     res.status(200).send(createSuccess('Login Successful'));
// });

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