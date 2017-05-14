const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const schemaOptions = {
    timestamps: true,
    versionKey: false,
    toJSON: {
        virtuals: true,
    },
};

const orgSchema = new mongoose.Schema({
    name: String,
    slug: String,
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true
    }]
}, schemaOptions);

// Helper library to autopopulate our members on the organization.
orgSchema.plugin(autopopulate);

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
