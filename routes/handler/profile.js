const User = require('../../controller/user');

module.exports.create = (req, res) => {
    let response;
    (async () => {
        try {
            let newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
            await newUser.create();
    
            if(req.body.Login){
                await newUser.createLogin({
                    loginId: req.body.Login.loginId,
                    password: req.body.Login.password
                })
            }
            response = JSON.stringify(newUser);
        }catch(e){
            console.error(e);
            response = e;
        }finally{
            res.send(response);
        }
    })();
    
}

module.exports.findAllUsers = (req,res) => {
    (async () =>{
        try{
            res.send(await User.findAll());
        }catch(e){
            res.send({});
        }
    })();
}

module.exports.findOneUser = (req,res) => {
    (async () =>{
        try{ 
            res.send(await User.findById(req.params.id)); 
        }catch(e){
            res.status(404).send('Profile Not Found');
        }
    })();
}

module.exports.findOneUserByLoginId = (req,res) =>{
    (async () => {
        try{
            res.send(JSON.stringify(await User.findByLoginId(req.params.id)));
        }catch(e){
            res.status(404).send('User Not Found');
        }
    })();
}

module.exports.get = (req, res) => {
    res.send('Not Implemented');
}