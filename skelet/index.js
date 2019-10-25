// const bodyParser = require('body-parser'); // maybe it should be deleted

require('./config/database')().then(() => {
    const config = require('./config/config');
    const app = require('express')();
    // app.use(bodyParser.urlencoded({ extended: true })); // same to this
    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port, console.log(`---Listening on port ${config.port}...`));
});