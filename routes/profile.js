const express = require('express');
const router = express.Router();
const profileHandler = require('./handler/profile');

router.route('/profile')
.get(profileHandler.get)
.post(profileHandler.create);

module.exports = router;