const mongoose = require('mongoose');
const TodoSchema = mongoose.Schema({
    _id: {
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date()
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TodoModel', TodoSchema, 'Todos');