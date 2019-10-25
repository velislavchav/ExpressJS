const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const saltRounds = 9;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username should be at least 3 characters!'],
        validate: {
            validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
            message: 'Username should consist only English letters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [3, 'Password should be at least 3 characters!'],
        validate: {
            validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
            message: 'Password should consist only English letters and digits!'
        },
    },
    createdArticles: [{
        type: ObjectId,
        ref: 'Article',
    }],
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { next(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return; }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);