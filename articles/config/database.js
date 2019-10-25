const mongoose = require('mongoose');
const config = require('./config');
const dbName = 'articles';

module.exports = () => {
    return mongoose.connect(config.dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true },
        console.log('---Connection with database is ready---'))
}