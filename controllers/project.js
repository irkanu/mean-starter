const Project = require('../models/Project');
const Org = require('../models/Org');

/**
 * POST /project
 */
exports.projectPost = function(req, res) {
    req.assert('project.name', 'Project name cannot be blank!').notEmpty();

    const projectData = req.body.project;
    const orgData = req.body.org;
    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    const project = new Project({
        name: projectData.name,
        org: orgData.id
    });

    project.save((err, project) => {
        if (!err) {
            Org.findById(orgData.id, (err, org) => {
                if (!err) {
                    org.projects.push(project);
                    org.save((err, org) => {
                        if (!err) {
                            res.send({
                                org: org,
                                project: project,
                                msg: 'Project successfully created!'
                            });
                        }
                    });
                }
            });
        }
    });
};

/**
 * POST /project/:id
 */
exports.projectGetById = (req, res) => {
    req.assert('id', 'Project ID must be specified!').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return res.status(400).send(errors);
    }

    Project.findById(req.params.id, (err, project) => {
        if (!err) {
            res.status(200).json(project);
        }
    });

};
