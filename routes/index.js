const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');
const orgController = require('../controllers/org');
const projectController = require('../controllers/project');
const path = require('path');

// Home Route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../app', 'index.html'));
});

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
router.post('/account/refresh',
    userController.ensureAuthenticated,
    userController.refresh
);
router.get('/unlink/:provider',
    userController.ensureAuthenticated,
    userController.unlink
);
router.post('/signup', userController.signupPost);
router.post('/login', userController.loginPost);
router.post('/forgot', userController.forgotPost);
router.post('/reset/:token', userController.resetPost);

// Org Controller Routes
router.post('/org',
    userController.ensureAuthenticated,
    orgController.orgPost
);
router.post('/org/:id',
    userController.ensureAuthenticated,
    // userController.ensureOrgAccess,
    orgController.orgGetById
);
router.put('/org',
    userController.ensureAuthenticated,
    // userController.ensureOrgAccess,
    orgController.orgPutGeneral
);
router.put('/org/rename',
    userController.ensureAuthenticated,
    // userController.ensureOrgAccess,
    orgController.orgPutRename
);

// Project Controller Routes
router.post('/project',
    userController.ensureAuthenticated,
    projectController.projectPost
);
router.post('/project/:id',
    userController.ensureAuthenticated,
    projectController.projectGetById
);


module.exports = router;
