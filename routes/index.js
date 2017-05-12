const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');

// Contact Controller Routes
router.post('/contact', contactController.contactPost);

// User Controller Routes
router.put('/account',
    userController.ensureAuthenticated,
    userController.accountPut
);
router.delete('/account',
    userController.ensureAuthenticated,
    userController.accountDelete
);
router.get('/unlink/:provider',
    userController.ensureAuthenticated,
    userController.unlink
);
router.post('/signup', userController.signupPost);
router.post('/login', userController.loginPost);
router.post('/forgot', userController.forgotPost);
router.post('/reset/:token', userController.resetPost);

module.exports = router;
