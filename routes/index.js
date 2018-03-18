
module.exports = (app, auth) => {

    const router = app.Router();
    const profileRoutes = require('./profile')(router, auth);
    const authRoutes = require('./auth')(router, auth);

    return router;
}
