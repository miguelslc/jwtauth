const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./db');
const users = require('./routes/index');
const path = require('path');

mongoose.connect(config.DB, {
    useNewUrlParser:true,
    useUnifiedTopology: true, 
    useCreateIndex:true
}).then (
    ()=>{ console.log('Database Connected')},
    err=>{console.log('Can not connect to the DB')}
);

const app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (req, res)=>{
    res.send('hello');
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.use('/', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
});