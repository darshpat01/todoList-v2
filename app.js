const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); 

const app = express(); 

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.render('showpage');
})

app.listen(3000, ()=>{
    console.log('Running on port 3000'); 
})
