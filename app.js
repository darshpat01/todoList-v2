const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const task = require('./models/task');
require('dotenv/config');

const app = express(); 

app.set('view engine', 'ejs');
mongoose.connect(process.env.db_connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('showpage');
})

app.listen(3000, ()=>{
    console.log('Running on port 3000'); 
})
