const mongoose = require('mongoose');

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
		ref: 'User'
	}]
}, schemaOptions);

const Org = mongoose.model('Org', orgSchema);

module.exports = Org;
