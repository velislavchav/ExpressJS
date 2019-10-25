const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title should be at least 3 characters!'],
        validate: {
            validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
            message: 'Title should consist only English letters and digits!'
        }
    },
    description: {
        type: String,
        required: true,
        maxlength: [100, 'Description should be maximum 100 characters!'],
    },
    imageUrl: {
        type: String,
        required: true,
        minlength: [5, 'Image URL should be at least 5 characters!'],
    },
    isPublic: {
        type: Boolean,
        default: false,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
    },
    creator: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },

});

module.exports = new Model('Course', courseSchema);