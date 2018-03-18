const express = require('express');
const app = express();
const OAuth2Server = require('oauth2-server');
const bodyParser = require('body-parser');
const models = require('./db');
const config = require('./config');
const db = models(config.database.username, config.database.password, config.database.host, config.database.port, config.database.dbname);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

(async () => {
    try {
        await db.init();
        global.db = models;
        
        const oauth = new OAuth2Server({
            model: require('./controller/oauth/models.js'),
            grants: ['password'],
            debug: true
        });        
                
        const routes = require('./routes')(express, oauth);
        app.use('/api/', routes);
                       
    } catch (e) {
        console.error(e);
    }
})();

app.listen(config.server.port);