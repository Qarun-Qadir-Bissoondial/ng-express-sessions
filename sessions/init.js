const session = require('express-session');
const SqlStore = require('connect-session-sequelize')(session.Store);

const HOUR_MS = 60 * 60 * 1000;

const extendDefaultFields = (defaults, session) => {
    return {
      data: defaults.data,
      expires: defaults.expires,
      userId: session.userId,
    };
};

module.exports = (dbObject) => {
    const sqlStore = new SqlStore({
        db: dbObject.connection,
        table: "Sessions",
        extendDefaultFields
    });

    return {
        middleware:  session({
            name: 'sid',
            secret: 'doggo',
            cookie: {
                maxAge:  HOUR_MS,
                sameSite: true,
                secure: false, // TODO: Get environment from NODE_ENV/process.env and determine if secure or not
            },
            resave: false,
            saveUninitialized: false,
            store: sqlStore
        }),
        sync: sqlStore.sync.bind(sqlStore)
    }
}

