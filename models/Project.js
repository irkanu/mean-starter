const mongoose = require('mongoose');

const schemaOptions = {
	timestamps: true,
	versionKey: false,
	toJSON: {
		virtuals: true,
	},
};

const projectSchema = new mongoose.Schema({
	name: String,
	guests: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
}, schemaOptions);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
