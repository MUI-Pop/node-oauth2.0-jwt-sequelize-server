const express = require('express');
const router = express.Router();
const profileHandler = require('./handler/profile');

router.route('/profile')
.get(profileHandler.findAllUsers)
.post(profileHandler.create);

router.route('/profile/:id')
.get(profileHandler.findOneUser);

router.route('/login/:id')
.get(profileHandler.findOneUserByLoginId);

module.exports = router;