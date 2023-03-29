const express = require('express')
const { renderSlot } = require('vue')
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = express()
const { dbUrl, sessionConfig } = require('./Config.cjs');
const User = require('./model/user.cjs')

mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once('open', () => {
    console.log('Database connected', dbUrl);
});


// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }));

// What we need for the CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*') // TODO: set this to the specific name
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, transformRequest")
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,HEAD')
    res.header("Access-Control-Allow-Credentials", "true")
    res.header('Access-Control-Request-Headers', 'transformrequest')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.sendStatus(200) : next()
})



app.use(session(sessionConfig))

app.use(passport.initialize()); // To initialize the passport
app.use(passport.session()); // To let express session work, must be put after express session
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy(User.createStrategy()));

passport.serializeUser(User.serializeUser()); // How to store user in the session
passport.deserializeUser(User.deserializeUser()); // How to get user out of the session





const adminRouter = require('./routers/admin.cjs');
app.use('/admin', adminRouter);

app.get('/haha', (req, res) => {
    res.send('home');
})




const port = process.env.PORT || 3000
console.log(port);
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})