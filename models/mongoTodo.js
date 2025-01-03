const mongoose = require('mongoose');

const mongoTodoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('MongoTodo', mongoTodoSchema);
