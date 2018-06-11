const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// get
router.get('/info/:token', userController.getInfoToken);

// post
router.post('/gentoken', userController.postGenToken);
// router.post('/add', userController.postAdd);
router.post('/update', userController.postUpdate);
router.post('/update/identity', userController.postUpdateIdentity);
router.post('/update/selfie', userController.postUpdateSelfie);

module.exports = router
