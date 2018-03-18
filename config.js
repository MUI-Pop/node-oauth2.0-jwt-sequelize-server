const config = {};

config.database = {};
config.server = {};

config.database.host = process.env.DB_HOST || 'localhost';
config.database.port = process.env.DB_PORT || 3000;
config.database.username = process.env.DB_USERNAME || 'kkanahat';
config.database.password = process.env.DB_PASSWORD || 'yamaha';
config.database.dbname = process.env.DB_NAME || 'authentication';

config.server.host = 'localhost';
config.server.port = 8080;

module.exports = config;
