const express = require('express'); 
const mongoose = require('mongoose'); 
const path = require('path'); 
const Task = require('./models/task');
const bodyparser = require('body-parser');

require('dotenv/config');

const app = express(); 

app.set('view engine', 'ejs');
mongoose.connect(process.env.db_connection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});


app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())




const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res)=>{
    const tasks = await Task.find({});
    res.render('showpage',{tasks});
})

app.post('/', async (req, res)=>{
    const newTask = new Task({name: req.body.name});
    try{
        await newTask.save(); 
        return res.redirect('/')  ;
    } catch(e){
        console.log(e); 
    }
})

app.get('/remove/:id', async(req, res)=>{
    const {id} = req.params; 
    try{    
        await Task.findByIdAndRemove(id); 
        return res.redirect('/');
    }catch(e){
        console.log(e);
    }
    
})

app.listen(3000, ()=>{
    console.log('Running on port 3000'); 
})



