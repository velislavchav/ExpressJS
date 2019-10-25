const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'lol'; ////// change that

module.exports = () => {
    return mongoose.connect(config.dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true },
        console.log('---Connection with database is ready---'))
}