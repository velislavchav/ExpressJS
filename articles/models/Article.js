const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Title should be at least 5 characters!'],

    },
    content: {
        type: String,
        required: true,
        minlength: [20, 'Content should be at least 20 characters!'],
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = new Model('Article', articleSchema);