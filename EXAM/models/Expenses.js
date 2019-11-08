const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const expensesSchema = new Schema({
    merchant: {
        type: String,
        required: true,
        minlength: [4, 'The merchant should be at least 4 characters!'],
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    total: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description should be at least 10 characters!'],
        maxlength: [50, 'Description should be max 50 characters!'],
    },
    report: {
        type: Boolean,
        required: true,
        default: false
    },
    creator: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
});

module.exports = new Model('Expenses', expensesSchema);