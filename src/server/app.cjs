const express = require('express')
const { renderSlot } = require('vue')
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');


const app = express()
const { dbUrl } = require('./Config.cjs');


mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once('open', () => {
    console.log('Database connected', dbUrl);
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.sendStatus(200) : next()
})


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