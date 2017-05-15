const mongoose = require('mongoose');

const schemaOptions = {
	timestamps: true,
	versionKey: false,
	toJSON: {
		virtuals: true,
	},
};

const projectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	guests: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
	org: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Org'
	}
}, schemaOptions);

	// experiments: [{
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Experiment'
	// }]

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
