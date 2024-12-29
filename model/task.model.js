const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true }, 
    description: { type: String,default: '', required: false }, 
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }, 
}, { versionKey: false });

module.exports = mongoose.model('Task', taskSchema);
