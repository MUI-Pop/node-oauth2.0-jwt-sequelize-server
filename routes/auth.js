const profileHandler = require('./handler/profile');
const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;


const tokenAuth = (auth) => {
    return (req,res,next) => {
        let request = new Request(req);
        let response = new Response(res);        

        return auth
          .token(request, response)
          .then((token) => {
            return res.json(token)
          }).catch((err) => {
            return res.status(500).json(err)
          })
      }
}
    

module.exports = (router, auth) => {

    router.route('/login')
        .post(tokenAuth(auth));

    return router;
}