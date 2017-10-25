const User = require('../../controller/user');

module.exports.create = (req, res) => {
    let newUser = new User();
    let response;
    (async () => {
        try {
            await newUser.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
    
            if(req.body.Login){
                await newUser.createLogin({
                    loginId: req.body.Login.loginId,
                    password: req.body.Login.password
                })
            }
            response = newUser.getJSON();
        }catch(e){
            console.error(e);
            response = e;
        }finally{
            res.send(response);
        }
    })();
    
}

module.exports.get = (req, res) => {
    res.send('Not Implemented');
}