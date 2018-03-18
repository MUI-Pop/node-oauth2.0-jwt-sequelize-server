const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;
const profileHandler = require('./handler/profile');

const authorize = (auth) => {
    return (req, res, next) => {
        let request = new Request(req);
        let response = new Response(res);
        return auth.authenticate(request, response)
        .then( (code) => {
          next();
        })
        .catch( (err) => {
            res.send(err);
        });
    }
}

module.exports = (router, auth) => {

    router.route('/profiles')
        .get(authorize(auth),profileHandler.findAllUsers)
        .post(profileHandler.create);

    router.route('/profiles/:id')
        .get(authorize(auth),profileHandler.findOneUser);

    return router;
}

