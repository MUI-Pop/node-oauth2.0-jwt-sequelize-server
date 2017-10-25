const LoginModel = require('../db').Models.Login;

let Login = function(){

  let loginId,
      password,
      userId;

  this.create = function (loginObj) {
    return new Promise((resolve, reject) => {
      if(!verifyLoginConstruct(loginObj)){
        reject('Malformed Login Object');
        return;
      }

      LoginModel.create(loginObj)
        .then((user) => {
          loginId = user.loginId;
          password = user.password;
          resolve(this);
        })
        .catch(e => {
          reject(e);
        })
    })
  }

  verifyLoginConstruct = function (loginObj) {
    if(('loginId' in loginObj) && ('password' in loginObj) && ('userId' in loginObj)){
      return true;
    }else{
      return false;
    }
  },

  this.findById = function (loginId) {
    return new Promise((resolve, reject) => {
      LoginModel.findById(loginId 
        //,{ include: [{model: UserModel}]}
      )
      .then((login) => {
        loginId = login.loginId;
        password = login.password;
        userId = login.userId;
        resolve(this);
      }).catch(e => {
        reject(e);
      })
    })
  },

  this.findAll = function(){
    return new Promise((resolve, reject) => {
      LoginModel.findAll(
        //{include: [{model: UserModel}]}
      )
      .then(result => {
        resolve(JSON.stringify(result));
      }).catch(e => {
        reject(e);
      })
    })
  }

  this.update = function(loginId){
    return new Promise((resolve, reject) => {
       LoginModel.update(loginId, { where: {loginId: loginId}, returning: true, plain: true})
      .then((user) => {
        resolve();
      }).catch(e => {
        reject(e);
      })
    })
  }

  this.getJSON = function(){
    return JSON.stringify({
      loginId: loginId, 
      password: password,
      //userId: userId
    });
  }
}

Login.model = LoginModel;
module.exports = Login;
