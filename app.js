const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./db')
const config = require('./config');
const db = models(config.database.username, config.database.password, config.database.host, config.database.port, config.database.dbname);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(express.static('public'));
//Initialize Database
(async () => {
    try {
    await db.init();
    const profileRoutes = require('./routes/profile');
    app.use('/api/', profileRoutes);
    }catch(e){
        console.error(e);
    }
})();


app.listen(config.server.port);