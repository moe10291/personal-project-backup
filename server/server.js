require('dotenv').config();
const express= require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const massive = require('massive');
const ctrl= require('./Controllers')
const path = require('path');

let {PORT, CONNECTION_STRING, SECRET}= process.env
const app=express();

app.use(bodyParser.json());
app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

massive(CONNECTION_STRING)
.then (db=> {
    app.set('db', db)
    
    app.listen(PORT, () =>{
        console.log (`Making Progress on Port ${PORT}`)
    })
})

app.post('/auth/login', ctrl.login)
app.post('/auth/signup', ctrl.signup)
app.post('/listing/add', ctrl.addHouse)

app.get('/listing', ctrl.seeList)
app.delete('/listing/:id', ctrl.removeListing)
app.get('/listing/:id', ctrl.stateInputs)
app.put('/listing/:id', ctrl.updateListing)
app.get('/real/listing', ctrl.realList)



app.post('/buyers/login', ctrl.buyersLogin)
app.post('/buyers/signup', ctrl.buyersSignup)
app.get('/logout', ctrl.logout)
app.get('/buyers/favts', ctrl.buyersFavts)
app.delete('/favts/:id', ctrl.removeFl)
app.post('/buyers/addFavts', ctrl.addFavts)
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});





