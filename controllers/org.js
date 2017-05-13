const Org = require('../models/Org');
const User = require('../models/User');

exports.orgPost = async(req, res, next) => {
    req.assert('name', 'Organization name cannot be blank!').notEmpty();

    var errors = req.validationErrors();

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