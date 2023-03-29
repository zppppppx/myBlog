const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/my-blog';
const secret = process.env.SECRET || 'thisshouldbeabettersecret'

const session = require('express-session');
const MongoDBStore = require('connect-mongo');

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60 // in seconds
});

module.exports.dbUrl = dbUrl




module.exports.sessionConfig = {
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    name: 'session',
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24,
        maxAge: Date.now() + 1000 * 60 * 60 * 24,
        httpOnly: true,
        // secure: true, // this will only allow https request
    }
};