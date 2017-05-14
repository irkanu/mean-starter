const Org = require('../models/Org');
const User = require('../models/User');

/**
 * POST /org
 */
exports.orgPost = async (req, res, next) => {
    req.assert('name', 'Organization name cannot be blank!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    const org = await new Org({
        name: req.body.name,
        members: [req.user._id]
    });

    org.save((err, org) => {
        if (!err) {
            User.findById(req.user.id, (err, user) => {
                if (!err) {
                    user.orgs.push({
                        role: 'owner',
                        org: org
                    });
                    user.save((err, user) => {
                        if (!err) {
                            res.send({
                                org: org,
                                user: user,
                                msg: 'Organization successfully created!'
                            });
                        }
                    });
                }
            });
        }
    });
};

/**
 * POST /org/:id
 */
exports.orgGetById = (req, res) => {

    // TODO: make sure the request params have an id
    // req.assert('id', 'Organization ID must be specified!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    Org.findById(req.params.id, (err, org) => {
        if (!err) {
            res.status(200).json(org);
        }
    });

};

/**
 * PUT /org
 */
exports.orgPutGeneral = (req, res) => {

    req.assert('id', 'Organization ID was not sent! Please contact support if this error continues.').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    Org.findById(req.body.id, (err, org) => {
        if (!err) {
            org.name = req.body.name;
            org.save((err) => {
                if (!err) {
                    console.log('orgPutGeneral() ', org);
                    res.send({
                        org: org,
                        msg: 'Your organization\'s general settings have been updated.'
                    });
                }
            });
        }
    });
};
