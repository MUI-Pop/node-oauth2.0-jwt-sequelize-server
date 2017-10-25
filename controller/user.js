const UserModel = require('../db').Models.User;
const Login = require('./login');

let User = function(){

  let firstName,
      lastName,
      email,
      id;

  let login = new Login();
  let LoginModel = Login.model;
  
  this.create = function (userObj) {
    return new Promise((resolve, reject) => {
      if(!verifyUserConstruct(userObj)){
        reject('Malformed User Object');
        return;
      }

      UserModel.create(userObj)
        .then((user) => {
          id = user.id;
          firstName = user.firstName;
          lastName = user.lastName;
          email = user.email;
          resolve(this);
        })
        .catch(e => {
          reject(e);
        })
    })
  }

  verifyUserConstruct = function (userObj) {
    if(('firstName' in userObj) && ('lastName' in userObj) && ('email' in userObj)){
      return true;
    }else{
      return false;
    }
  },

  this.findById = function (userId) {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId, { include: [{model: LoginModel}]})
      .then((user) => {
        id = user.id;
        firstName = user.firstName;
        lastName = user.lastName;
        email = user.email;
        if(user.login)
          login = login.findById(user.login.loginId);
        resolve(this);
      }).catch(e => {
        reject(e);
      })
    })
  },

  this.findAll = function(){
    return new Promise((resolve, reject) => {
      UserModel.findAll({include: [{model: LoginModel}]})
      .then(result => {
        resolve(JSON.stringify(result));
      }).catch(e => {
        reject(e);
      })
    })
  }

  this.update = function(userObj){
    return new Promise((resolve, reject) => {
       UserModel.update(userObj, { where: {id: id}, returning: true, plain: true})
      .then((user) => {
        resolve();
      }).catch(e => {
        reject(e);
      })
    })
  }

  this.getJSON = function(){
    return JSON.stringify({id: id,
      firstName: firstName, 
      lastName: lastName, 
      email: email,
      login: login.getJSON()
    });
  }

  this.createLogin = function(loginObj){
    loginObj.userId = id;
    return new Promise((resolve, reject) => {
      login.create(loginObj)
      .then(loginObj => {
        login = loginObj;
        resolve(this);
      }).catch(e => {
        reject(e);
      })
    })    
  }
}

module.exports = User;