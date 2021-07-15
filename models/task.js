const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName:{
        type: String,
        required: true
    },
    taskStatus:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema); 